function isSegmentIntersect([a, b], [c, d]) {
  return d > a && b > c;
}
class SegmentSplitter {
  segments = [];
  start;
  end;

  constructor(start, end) {
    this.segments.push([start, end]);
    this.start = start;
    this.end = end;
  }

  addInterval(i, j) {
    if (i >= j) {
      return;
    }
    const newSegments = [];
    this.segments.forEach(([start, end]) => {
      if (!isSegmentIntersect([start, end], [i, j])) {
        newSegments.push([start, end]);
      } else {
        if (start < i) {
          newSegments.push([start, i]);
        }
        if (j < end) {
          newSegments.push([j, end]);
        }
      }
    });
    this.segments = newSegments;
  }

  getSegments() {
    return this.segments;
  }

  getSegmentByLength(start, length) {
    function getSegment(segStart, segEnd) {
      if (segStart <= start && start <= segEnd) {
        const searchStart = Math.max(start, segStart);
        if (segEnd - searchStart >= length) {
          return [searchStart, searchStart + length];
        }
      } else {
        if (segEnd - segStart >= length) {
          return [segStart, segStart + length];
        }
        return null;
      }
      return null;
    }
    // Find the segment containing start
    let startSegmentIndex = this.segments.findIndex(
      ([segStart, segEnd]) => segStart <= start && start <= segEnd
    );

    if (startSegmentIndex === -1) {
      // If start is not within any segment, find the nearest segment
      startSegmentIndex = this.segments.findIndex(([segStart]) => segStart < start) - 1;
      if (startSegmentIndex === -2) {
        startSegmentIndex = 0;
      }
    }

    // Search towards smaller values, starting from the found segment
    for (let i = startSegmentIndex; i >= 0; i--) {
      const [segStart, segEnd] = this.segments[i];
      const segment = getSegment(segStart, segEnd);
      if (segment) {
        return segment;
      }
    }

    // If not found, search towards larger values, starting from the segment after the found segment
    for (let i = startSegmentIndex + 1; i < this.segments.length; i++) {
      const [segStart, segEnd] = this.segments[i];
      const segment = getSegment(segStart, segEnd);
      if (segment) {
        return segment;
      }
    }

    // If no suitable segment found
    return null;
  }
}

// const splitter = new SegmentSplitter(0, 10);
// console.log(splitter.getSegments()); // [[0, 10]]

// // splitter.addInterval(3, 7);
// // console.log(splitter.getSegments()); // [[0, 3], [7, 10]]

// // splitter.addInterval(1, 4);
// // console.log(splitter.getSegments()); // [[0, 1], [7, 10]]

// // splitter.addInterval(8, 9);
// // console.log(splitter.getSegments()); // [[0, 1], [7, 8], [9, 10]]

// splitter.addInterval(3, 20);
// console.log(splitter.getSegments()); // [[0, 1], [7, 8], [9, 10]]

const splitter = new SegmentSplitter(0, 10);
// splitter.addInterval(3, 4);
console.log(splitter.getSegments());

console.log( 2, 2, splitter.getSegmentByLength(2, 2, true)); // [7, 9]
console.log(8, 2, splitter.getSegmentByLength(8, 2, false)); // [1, 3]
console.log(5, 3, splitter.getSegmentByLength(5, 3, true)); // [5, 8]
console.log(8, 3, splitter.getSegmentByLength(8, 3, true)); // [0, 3]
