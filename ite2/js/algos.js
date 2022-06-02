// Converts from degrees to radians.

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
  return getDistanceFromLatLonInKm(city.latitude, city.longitude, 45.188529, 5.724524);
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

  if(csvData[i].dist < csvData[j].dist){ return true; }
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
    for (let j = i + 1; j < csvData.length ; j++){ isLess(j,iMin) === true ? (min = csvData[j] , iMin = j) : ''; }
    swap(iMin,i);
  }
}

// -----------------------------------

function bubblesort() {
  for(let i = 0; i < csvData.length; i++){
    for(let j = i+1; j < csvData.length; j++){ isLess(j,i) === true ? swap(i,j) : ''; }
  }
}

// -----------------------------------

const gaps = [701, 301, 132, 57, 23, 10, 4, 1];
function shellsort() {
  for (let g = 0; g < gaps.length; g++){
    let gap = gaps[g];
    for (let i = gap; i < csvData.length; i++){
      for (let j = i, k= j-gap; k >= 0 && isLess(j, k) ; j -= gap, k-= gap){ swap(j, k); }
      // ou sans la variable k
      // for (var j = i; j >= gap && isLess(j,j-gap); j -= gap) { swap(j, j-gap); }
    }
  }
}

// -----------------------------------
function merge(first, second,length){
   let firstPart = first === second , secondPart = second-first === length;

   if (firstPart || secondPart){ return; }

   if (isLess(first,second)){
     merge(first + 1, second,length - 1);
   } else {
     for (let i = second;i >= first + 1; i --){
         swap(i, i - 1);
     }
     merge(first +1,second +1, length -1);
   }
}

function mergesort(start = 0,length = N){
  let mid;
  (length > 1) && ( mid = Math.floor(length/2), mergesort(start,mid), mergesort(start+mid, length-mid), merge(start,start+mid, length));
}
// -----------------------------------
function createHeap(){
  for (let i = Math.floor(N/2); i >= 0; i--){ cram(N,i); }
}

function cram(end, index){
  let left = 2 * index + 1 , right = 2 * index + 2 , max = index;
  (right < end && isLess(max,right)) && (max = right);
  (left < end && isLess(max, left)) && (max = left);
  (index !== max) && (swap(max, index) , cram(end,max));
}

function heapsort() {
  createHeap()
  for (let i = N - 1; i >= 0; i--){ (swap(0,i), cram(i,0))}
}

// -----------------------------------
function part(left, right){
  let pIndex = left;
  for (let i = left; i <= right; i++){ (isLess(i, right)) && (swap(pIndex, i), pIndex++); }
  swap(pIndex, right);
  return pIndex;
}
function quicksort(left = 0,right = csvData.length - 1) {
  let pivot;
  (left < right) && (pivot = part(left, right), quicksort(left, pivot - 1), quicksort(pivot + 1, right));
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
