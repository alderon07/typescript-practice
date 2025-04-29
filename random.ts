const str: string[] = ["eat","tea","tan","ate","nat","bat"];
console.log(groupAnagrams(str));

function groupAnagrams(strs: string[]): string[][] {
    const len: number = strs.length;
    
    if(len === 0) return [[""]];
    if(len === 1) return [[strs[0]]];
    
    const output: string[][] = [];
    const map = new Map<string, string[]>;

    let i: number = 0;
    
    // time: O(n * klog(k))
    // space: O(n * k) because we create a temporary O(k) array during sorting. While the map and output are O(n) roughly. When thinking about space we think of references. 
    while (i < len){  // looping through n strs which will take O(n) time
      const sorted_anagram: string = strs[i].split('').sort().join(''); // sort takes O(k * log(k))
      if(map.has(sorted_anagram)){
        const anagram_array: string[] = map.get(sorted_anagram)
        anagram_array.push(strs[i]);
        map.set(sorted_anagram, anagram_array);
      }else{
        map.set(sorted_anagram, [strs[i]]);
      }
      i++;
    }
    
    // O(n/2) ==> O(n)
    for(const value of map.values()){
      output.push(value)
    }

    return output;
};

function isAnagram(s: string, t: string): boolean {
    // Time: O(n) because we go through slen and tlen which will be same size since we return immediately if they aren't. Also, the map check against each other also goes through the keys once. 
    // Space: O(n) the size of smap and tmap change depending on the inputs
    const slen: number = s.length;
    const tlen: number = t.length;
    
    if(slen !== tlen) return false;
    
    const smap = new Map<string, number>();
    const tmap = new Map<string, number>();
    
    // can use the ?? syntax to check for null or undefined value ?? 0. If the value is null or undefined we use 0.
    let i: number = 0;
    while(i < slen){
      const key: string = s.charAt(i);
      let value: number | undefined = smap.get(key);
      if(value === undefined) value = 0;
      if(value !== null) smap.set(key, value++);
      i++;
    }


    i = 0;
    while(i < tlen){
      const key: string = t.charAt(i);
      let value: number | undefined = tmap.get(key);
      if(value === undefined) value = 0;
      if(value !== null) tmap.set(key, value++);
      i++;
    }

    // check the maps against each other
    for(const [key, value] of smap.entries()){
      if(value !== tmap.get(key)){
        return false;
      }
    }
    return true;
};

function hasDuplicate(nums: number[]): boolean {
    // Space: O(n)
    // Time: O(n)
    const set = new Set<number>();
    for(const num of nums) {
        // console.log(`value: ${value}, set: ${Array.from(set)}`);
        // console.log(set.has(num));
        if(set.has(num)){
            return true;
        }
        set.add(num);
    }
    return false;
}

function getConcatenation(nums: number[]): number[] {
    // O(2n) since we are creating an new ans array the size of 2n. 
    // O(2n) will just be O(n) time solution
    // All assignments are O(1)
    // Space: O(1)
    const n: number = nums.length;
    const twoN: number = n * 2;
    let ans: number[] = [];

    let i: number = 0, j: number = 0;

    while (j < twoN){
        console.log(`idx: ${i} | num_value: ${nums[i]}`);
        ans[j] = nums[i]; 
        i++;
        if(i > n - 1){
            i = 0;
        }
        j++;
    }
  
    return ans;
};


