export function getInitialsFromName(name) {
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

    let initials = [...name.matchAll(rgx)] || [];

    initials = (
        (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
    ).toUpperCase();
    return initials;
}

// Search insert position O(log n) time complexity, 
export function searchInsert(nums, target) {
    var found = false;
    var first = 0;
    var last = (nums.length - 1);
    var mid = 0;

    if (target == 0 && !nums.contains(-1)) {
        return 0;
    }

    while (first <= last && !found) {
        mid = parseInt(((first + last) / 2))
        if (nums[mid] == target) {
            found = true;
        }
        else {
            if (target < nums[mid]) {
                last = mid - 1;
            }
            else {
                first = mid + 1;
            }
        }
    }

    if (!found) return first;

    return mid;
}
