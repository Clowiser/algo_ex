
// Converts from degrees to radians.
import {csv, partition} from "./lib/d3.min";

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 

   // Distance in km
  return R * c;
}


// Calculates the distance between Grenoble and the given city
function distanceFromGrenoble(city) {
  // Latitude de Grenoble	45.188529
  // Longitude de Grenoble	5.724524
  let allDist =  getDistanceFromLatLonInKm(city.latitude, city.longitude, 45.188529,5.724524);

  console.log(allDist);
  return allDist;
}


// Swap 2 values in array csvData
// i is the index of the first city
// j is the index of the second city
function swap(i,j) {
  displayBuffer.push(['swap', i, j]); // Do not delete this line (for display)

    let val = csvData[i];
    csvData[i] = csvData[j];
    csvData[j] = val;
}

// Returns true if city with index i in csvData is closer to Grenoble than city with index j
// i is the index of the first city
// j is the index of the second city
function isLess(i, j) {
  displayBuffer.push(['compare', i, j]); // Do not delete this line (for display)

  if(csvData[i].dist < csvData[j].dist){
    return true;
  }
}

// -----------------------------------


function insertsort() {
  for (let i = 1; i < csvData.length; i++){
    let j = i;
    let k = j - 1;
    while ( k >= 0 && isLess(j, k)){
      swap(k, j);
      j--;
      k--;
    }
  }
}

// -----------------------------------

function selectionsort() {
  for (let i = 0; i < csvData.length; i++){

    let min = csvData[i].dist;
    let iMin = i;
    for (let j = i + 1; j < csvData.length ; j++){
      if (isLess(j,iMin) === true){
          min = csvData[j];
          iMin = j;
      }
    }
    swap(iMin,i);
  }
}

// -----------------------------------

function bubblesort() {
  for(let i = 0; i < csvData.length; i++){
    for(let j = i+1; j < csvData.length; j++){
      if (isLess(j,i) === true){
        swap(i,j);
      }
    }
  }
}

// -----------------------------------

const gaps = [701, 301, 132, 57, 23, 10, 4, 1];
function shellsort() {
  // debugger;
  for (let g = 0; g < gaps.length; g++){
    let gap = gaps[g];
    for (let i = gap; i < csvData.length; i++){
      for (let j = i, k= j-gap; k >= 0 && isLess(j, k) ; j -= gap, k-= gap){
        swap(j, k);
      }
    }
  }
}

// -----------------------------------

function mergesort(start=0, length=N) {
  console.log("mergesort - implement me !");
}

// -----------------------------------

function heapsort() {
  console.log("heapsort - implement me !");
}

// -----------------------------------
function part(arr, start, end){
  const pivotValue = arr[end];
  let pivotIndex = start;

  for (let i = start; i < csvData.length; i++){
    if (isLess(arr[i],pivotValue)) {
      swap(arr[i], arr[pivotIndex])
      pivotIndex++;
    }
  }

  [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
  return pivotIndex;
}
function quicksort(arr,start,end) {
  let index = part(arr,start,end);
  quicksort(arr,start, index - 1);
  quicksort(arr, index + 1,end);

  // if(first<last) {
  //   const pivot = partition(first, last, selectPivot(first, last));
  //   quicksort(first, pivot-1);
  //   quicksort(pivot+1, last);
  // }
}

// -----------------------------------

function sort(algo)
{
  console.time(algo)
  switch (algo)
  {
    case 'insert': insertsort();break;
    case 'select': selectionsort();break;
    case 'bubble': bubblesort();break;
    case 'shell': shellsort();break;
    case 'merge': mergesort();break;
    case 'heap': heapsort();break;
    case 'quick': quicksort();break;
    default: throw 'Invalid algorithm ' + algo;
  }
  console.timeEnd(algo);
  console.log("Comparaison : ", countOp("compare"));
  console.log("Permutation : ", countOp("swap"));
}

function countOp(opName) {
  return displayBuffer.reduce(
    (count, op) => (op[0]===opName? count+1 : count),
    0
  );
}
