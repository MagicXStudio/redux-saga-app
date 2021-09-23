const floor = Math.floor;

const mergeSort = function (array, comparefn) {
    debugger;
    const length = array.length;
    var middle = floor(length / 2);
    if (length < 8) {
        let items = insertionSort(array, comparefn);
        return items;
    }
    else {
        let left = mergeSort(array.slice(0, middle), comparefn);
        let right = mergeSort(array.slice(middle), comparefn);
        let items = merge(left, right, comparefn);
        return items;
    }
};

const insertionSort = function (array, comparefn) {
    const length = array.length;
    var i = 1;
    var element, j;

    while (i < length) {
        j = i;
        element = array[i];
        while (j && comparefn(array[j - 1], element) > 0) {
            array[j] = array[--j];
        }
        if (j !== i++) array[j] = element;
    } return array;
};



var merge = function (left, right, comparefn) {
    const llength = left.length;
    const rlength = right.length;
    var lindex = 0;
    var rindex = 0;
    var result = [];

    while (lindex < llength || rindex < rlength) {
        if (lindex < llength && rindex < rlength) {
            result.push(comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]);
        } else {
            result.push(lindex < llength ? left[lindex++] : right[rindex++]);
        }
    } return result;
};
export default mergeSort;
