class Node {
    constructor(val) {
      this.val = val;
      this.next = null;
    }
  }
  
  /** LinkedList: chained together nodes. */
  
  class LinkedList {
    constructor(vals = []) {
      this.head = null;
      this.tail = null;
      this.length = 0;
  
      for (let val of vals) this.push(val);
    }
  
    /** push(val): add new value to end of list. */
  
    push(val) {
      let newNode = new Node(val);

      if (!this.head) {
        this.head = newNode;
      }
      if (this.tail) {
        this.tail.next = newNode;
      }

      this.tail = newNode;

      this.length++;
    }
  
    /** unshift(val): add new value to start of list. */
  
    unshift(val) {
      let newNode = new Node(val);

      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        newNode.next = this.head;
        this.head = newNode;
      }

      this.length++;
    }
  
    /** pop(): return & remove last item. */
  
    pop() {
      let returnVal = null;

      if (this.tail) {
        let currentNode = this.head;
        let prevNode = '';
        while (currentNode.next) {
          prevNode = currentNode;
          currentNode = currentNode.next;
        }
        prevNode.next = null;
        this.tail = prevNode;
        returnVal = currentNode.val;
        this.length--;
      }

      return returnVal;
    }
  
    /** shift(): return & remove first item. */
  
    shift() {
      let returnVal = null;

      if (this.head) {
        returnVal = this.head.val;
        this.head = this.head.next;
        this.length--;
      }

      return returnVal;
    }
  
    /** getAt(idx): get val at idx. */
  
    getAt(idx) {
      if (idx >= this.length || idx < 0) {
        console.log("Invalid index.");
        return null;
      }

      let currentNode = this.head;
      let currentIdx = 0;
      while (currentIdx != idx) {
        currentNode = currentNode.next;
        currentIdx++;
      }

      return currentNode.val;
    }
  
    /** setAt(idx, val): set val at idx to val */
  
    setAt(idx, val) {
      if (idx >= this.length || idx < 0) {
        console.log("Invalid index.");
        return null;
      }

      let currentNode = this.head;
      let currentIdx = 0;
      while (currentIdx != idx) {
        currentNode = currentNode.next;
        currentIdx++;
      }

      currentNode.val = val;

      return currentNode.val;
    }
  
    /** insertAt(idx, val): add node w/val before idx. */
  
    insertAt(idx, val) {
      if (idx >= this.length || idx < 0) {
        console.log("Invalid index.");
        return null;
      }

      let currentNode = this.head;
      let prevNode = null;
      let currentIdx = 0;
      while (currentIdx != idx) {
        prevNode = currentNode;
        currentNode = currentNode.next;
        currentIdx++;
      }

      const newNode = new Node(val);
      prevNode.next = newNode;
      newNode.next = currentNode;

      return undefined;
    }
  
    /** removeAt(idx): return & remove item at idx, */
  
    removeAt(idx) {
  
    }
  
    /** average(): return an average of all values in the list */
  
    average() {
      if (idx >= this.length || idx < 0) {
        console.log("Invalid index.");
        return null;
      }

      let currentNode = this.head;
      let currentIdx = 0;
      let sum = currentNode.val;
      while (currentIdx != idx) {
        currentNode = currentNode.next;
        currentIdx++;
        sum += currentNode.val;
      }

      return sum / this.length;
    }
  }
  