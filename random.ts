const str: string[] = ["eat","tea","tan","ate","nat","bat"];
const nums: number[] = [1,2,3,4,5];

console.log(binarysearch(nums, 3))
function hasCycle(head: ListNode | null): boolean {
  const set = new Set<ListNode>;

  while(head !== null){
    if(set.has(head)) return true;
      set.add(head)
      head = head.next
    }

    return false;
};

function reverseList(head: ListNode | null): ListNode | null {
  let curr = head;
  let prev = null;

  while (curr !== null) {
      let temp = curr.next;
      curr.next = prev
      
      prev = curr
      curr = temp;
  }
  return prev;
};

// time: log(n) | space: O(1)
function binarysearch(nums: number[], target: number): number {
  let low: number = 0;
  let high: number = nums.length - 1;
  
  while(low <= high){
    let mid: number = low + Math.floor((high - low) / 2)
    // [1,2,3,4,5]
    // mid = 2
    if(target === nums[mid]){
      return mid;
    }
    else if (target < nums[mid]) {
      high = mid - 1;  
    }
    else{
      low = mid + 1;
    }
  }
  
  return -1;
};

function maxSlidingWindow(nums: number[], k: number): number[] {
    const maxArray: number[] = [];
    let left: number = 0;

    for(let i = k; i <= nums.length; i++){
      console.log(nums)
      let currWindow: number[] = nums.slice(left, i)
      console.log(currWindow);
      console.log(k)
      let currMax = currWindow.toSorted((a, b) => a - b)[k - 1];
      console.log(currMax);
      maxArray.push(currMax);
      left++
    }

    return maxArray;
};

function calPoints(operations: string[]): number {
  let stack = [];

  for(let i = 0; i < operations.length; i++){
      const operation: string = operations[i];
      const stackLength: number =  stack.length;

      if(operation === '+'){
          stack.push(parseInt(stack[stackLength - 2]) + parseInt(stack[stackLength - 1]));
      }else if(operation === 'D'){
          stack.push(parseInt(stack[stackLength - 1]) * 2)
      }else if (operation === 'C'){
          stack.pop();
      }else{
          stack.push(operation);
      }
  }

  let sum: number = 0;

  if(stack.length === 0){
    return sum;
  }

  sum = stack.map((x) => parseInt(x)).reduce((x, y) => x + y, 0);
  return sum;
};

function numRescueBoats(people: number[], limit: number): number {
    let boats: number = 0;
    const sorted = people.sort((a, b) => a - b);

    let left: number = 0, right: number = people.length - 1;

    while (left <= right){
      if(people[left] + people[right] <= limit){
        left++;
      }
      right--;
      boats++
    }
    
    return boats
};

function mergeAlternately(word1: string, word2: string): string {
  const word1Length = word1.length;
  const word2Length = word2.length;
  
  let largestLength: number = Math.max(word1Length, word2Length);
  
  let i: number = 0;
  const newStrArray: string[] = [];
  while(i < largestLength){
    if(i < word1Length) newStrArray.push(word1[i]);
    if(i < word2Length) newStrArray.push(word2[i]);
    i++;
  }
  
  return newStrArray.join("");
};

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
      const sorted_anagram: string = strs[i].split('').sort().join(); // sort takes O(k * log(k))
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
    // can do [...map.values()]
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

class MyStack<T> {
  private stack: T[];
  
  constructor() {
      this.stack = [];
  }

  push(x: T): void {
      this.stack.push(x);
  }

  pop(): T {
      if(this.stack.length !== 0){
        return this.stack.pop()!;
      }
  }

  top(): T {
      return this.stack[this.stack.length - 1];
  }

  empty(): boolean {
      return this.stack.length === 0;
  }
}

const stack: MyStack<string> = new MyStack();

// stack.push('2')
// stack.push("hello")
// console.log(stack.top())
// console.log(stack.empty())
// stack.pop()
// stack.pop()
// stack.pop()
// stack.pop()
// console.log(stack)
class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

class TimeMap {
  private timeMap: Map<string, timeMapDataArray>;
  
  constructor() {
      this.timeMap = new Map<string, timeMapDataArray>();
  }

  set(key: string, value: string, timestamp: number): void {
    const data: timeMapData = {
      timestamp,
      value
    };

    const existingArray: timeMapDataArray = this.timeMap.get(key) ?? [];
    existingArray.push(data);             // in-place push is more efficient than spreading
    this.timeMap.set(key, existingArray);
  }

  get(key: string, timestamp: number): string {
      const dataArray: timeMapDataArray = this.timeMap.get(key) ?? [];
      if(dataArray.length === 0 || timestamp < dataArray[0].timestamp) return "";
      return search(dataArray, timestamp);
  }
}

function search(array: timeMapDataArray,timestamp: number) : string {
  let low = 0;
  let high = array.length - 1;
  let mid: number;

  while(low <= high){
    mid = low + Math.floor((high - low) / 2);
    if(array[mid].timestamp === timestamp){
      return array[mid].value;
    }else if (array[mid].timestamp < timestamp){
      low = mid + 1;
    }else{
      high = mid - 1
    }
  }

  return array[high]?.value ?? ""
}

interface timeMapData {
  readonly timestamp: number;
  readonly value: string;
}

type timeMapDataArray = timeMapData[];

class MinStack {
  private stack: number[];
  private minStack: number[];
  
  constructor() {
      this.minStack = [];
      this.stack = [];
  }

  push(val: number): void {
      if(!this.isEmpty()){
        this.minStack.push(Math.min(this.minStack[this.minStack.length - 1], val))
      }else{
        this.minStack.push(val)
      }
      this.stack.push(val)
  }

  pop(): void {
      this.stack.pop()
      this.minStack.pop()
  }

  top(): number {
      return this.stack[this.stack.length - 1]
  }

  isEmpty(): boolean{
    return this.stack.length <= 0
  }

  getMin(): number {
    return this.minStack[this.minStack.length - 1];
  }
}

var obj = new MinStack()
obj.push(6)
obj.push(1)
obj.push(2)
console.log(obj)
obj.pop()
console.log(obj)
var param_3 = obj.top()
var param_4 = obj.getMin()

console.log(obj)