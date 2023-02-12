
// SSA 2019 Acturial life expectency table for years 0-119
// life_expectency[age_in_years] = [male_life_left, female_life_left]
var life_expectency = { 0: [76.22, 81.28], 1: [75.69, 80.69], 2: [74.72, 79.72], 3: [73.74, 78.73], 4: [72.76, 77.75], 5: [71.77, 76.76], 6: [70.78, 75.77], 7: [69.79, 74.77], 8: [68.79, 73.78], 9: [67.80, 72.79], 10: [66.81, 71.80], 11: [65.82, 70.80], 12: [64.82, 69.81], 13: [63.83, 68.82], 14: [62.85, 67.83], 15: [61.87, 66.84], 16: [60.89, 65.85], 17: [59.93, 64.87], 18: [58.97, 63.89], 19: [58.01, 62.91], 20: [57.07, 61.93], 21: [56.13, 60.95], 22: [55.20, 59.98], 23: [54.27, 59.01], 24: [53.35, 58.04], 25: [52.42, 57.07], 26: [51.50, 56.11], 27: [50.58, 55.14], 28: [49.66, 54.17], 29: [48.74, 53.21], 30: [47.83, 52.25], 31: [46.91, 51.29], 32: [46.00, 50.34], 33: [45.09, 49.38], 34: [44.18, 48.43], 35: [43.27, 47.48], 36: [42.36, 46.53], 37: [41.45, 45.59], 38: [40.55, 44.64], 39: [39.64, 43.70], 40: [38.74, 42.76], 41: [37.84, 41.82], 42: [36.94, 40.88], 43: [36.04, 39.95], 44: [35.15, 39.01], 45: [34.26, 38.08], 46: [33.37, 37.16], 47: [32.49, 36.24], 48: [31.61, 35.32], 49: [30.74, 34.41], 50: [29.88, 33.50], 51: [29.02, 32.60], 52: [28.18, 31.71], 53: [27.34, 30.82], 54: [26.51, 29.93], 55: [25.69, 29.06], 56: [24.89, 28.19], 57: [24.09, 27.33], 58: [23.31, 26.48], 59: [22.53, 25.63], 60: [21.77, 24.79], 61: [21.01, 23.96], 62: [20.27, 23.14], 63: [19.54, 22.32], 64: [18.81, 21.51], 65: [18.09, 20.70], 66: [17.37, 19.89], 67: [16.67, 19.10], 68: [15.97, 18.31], 69: [15.28, 17.52], 70: [14.59, 16.75], 71: [13.91, 16.00], 72: [13.25, 15.25], 73: [12.59, 14.52], 74: [11.95, 13.80], 75: [11.32, 13.10], 76: [10.71, 12.41], 77: [10.11, 11.74], 78: [9.54, 11.08], 79: [8.97, 10.45], 80: [8.43, 9.83], 81: [7.90, 9.23], 82: [7.39, 8.65], 83: [6.91, 8.09], 84: [6.44, 7.56], 85: [6.00, 7.05], 86: [5.57, 6.56], 87: [5.17, 6.10], 88: [4.80, 5.67], 89: [4.45, 5.26], 90: [4.12, 4.88], 91: [3.82, 4.52], 92: [3.54, 4.20], 93: [3.29, 3.90], 94: [3.06, 3.63], 95: [2.86, 3.39], 96: [2.69, 3.17], 97: [2.54, 2.98], 98: [2.40, 2.81], 99: [2.28, 2.65], 100: [2.16, 2.49], 101: [2.05, 2.34], 102: [1.94, 2.20], 103: [1.83, 2.07], 104: [1.73, 1.94], 105: [1.63, 1.82], 106: [1.54, 1.70], 107: [1.45, 1.59], 108: [1.37, 1.48], 109: [1.28, 1.38], 110: [1.21, 1.28], 111: [1.13, 1.19], 112: [1.06, 1.10], 113: [0.99, 1.02], 114: [0.92, 0.94], 115: [0.86, 0.87], 116: [0.80, 0.80], 117: [0.74, 0.74], 118: [0.68, 0.68], 119: [0.63, 0.63] }

function zeroPad(aNumber) {
    return ("0" + aNumber).slice(-2);
}
function humanTime(timeStamp) {
    var M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var D = new Date(timeStamp); // 23 Aug 2016 16:45:59 <-- Desired format.
    return D.getDate() + " " + M[D.getMonth()] + " " + D.getFullYear() + " " + D.getHours() + ":" + zeroPad(D.getMinutes()) + ":" + zeroPad(D.getSeconds());
}

function getAbsTimeDelta(delta_ms) {
    // Turn input milliseconds into years, days, hours, minutes, seconds (0 values are not printed)
    // Returns the absolute delta, regardless of negative/positive input.
    // Example: 1 year, 3 days, 2 hours, 4 minutes, 1 seconds
    // Example: 3 days, 4 minutes, 
    // Very inefficient way of calculating year/mon/day/hour/min/second offsets
    var s_min = 60;
    var s_hour = s_min * 60;
    var s_day = s_hour * 24;
    var s_year = s_day * 365.25;

    // Use absolute delta, even if negative.
    var s = Math.abs(delta_ms) / 1000; // seconds    

    // TODO : Handle periods between -1 year and 0 seconds ago correctly.
    var diffY = Math.floor(s / s_year);
    s -= diffY * s_year;

    var diffD = Math.floor(s / s_day);
    s -= diffD * s_day;

    var diffH = Math.floor(s / s_hour);
    s -= diffH * s_hour;

    var diffM = Math.floor(s / s_min);
    s -= diffM * s_min;

    diffS = s;

    return [diffY, diffD, diffH, diffM, diffS];
}

function getPrettyTimeDelta(delta_ms) {
    var has_passed = delta_ms < 0;
    var delta = getAbsTimeDelta(delta_ms);

    parts = []
    if (delta[0] != 0) {
        parts.push(delta[0] + ' years');
        if (has_passed) {
            // Remove hours/min/sec if > 1 year in the past
            delta[2] = 0;
            delta[3] = 0;
            delta[4] = 0;
        }
    }
    if (delta[1] != 0) {
        parts.push(delta[1] + ' days');
        if (has_passed) {
            // Remove min/sec if > 1 day in the past
            delta[3] = 0;
            delta[4] = 0;
        }
    }
    if (delta[2] != 0) {
        parts.push(delta[2] + ' hours');
    }
    if (delta[3] != 0) {
        parts.push(delta[3] + ' min');
    }
    if (delta[4] != 0) {
        parts.push(delta[4].toFixed(0) + ' seconds');
    }
    msg = parts.join(', ');
    if (has_passed) {
        msg = 'Passed ' + msg + ' ago';
    }
    else {
        msg += ' left';
    }
    return msg;
}

var lifespan_years = 100;

function getLifeCrises() {
    // Just build a new table every time
    var today = new Date(); // Today
    var bday_val = document.getElementById("bday").value;
    var bday = new Date(bday_val.replace(/-/g, '/').replace('T', ' ')); // Use local timezone
    var age_ms = new Date() - bday;
    var age_years = age_ms / (365.25 * 24 * 60 * 60 * 1000);
    var age = getAbsTimeDelta(age_ms); // [years, months, days, ...]
    var crises_table = document.getElementById("crises");
    var sex_sel = document.getElementById("sex");
    var sex_id = parseInt(sex_sel.value);

    var life_expectency_ms = life_expectency[age[0]][sex_id] * (365.25 * 24 * 60 * 60 * 1000);

    var lifespan_ms = age_ms + life_expectency_ms;

    lifespan_years = lifespan_ms / (365.25 * 24 * 60 * 60 * 1000);



    // var lifespan_ms = lifespan_years * (365.25 * 24 * 60 * 60 * 1000); // in ms
    var lifespan_element = document.getElementById("lifespan")
    lifespan_element.textContent = `${age_years.toFixed(1)} year old ${sex_sel.options[sex_sel.selectedIndex].text}: ~${lifespan_years.toFixed(1)} years`;

    // Clear out previous elements in list
    while (crises_table.rows.length > 0) {
        crises_table.deleteRow(0);
    }

    // Skip generating entries with a NaN birthday date
    if (isNaN(bday)) {
        return;
    }

    // Update list with crises
    for (var i = 0; i < crises_sorted.length; i++) {
        var crises_name = crises_sorted[i][0];
        var crises_percent = crises_sorted[i][1];

        var row = crises_table.insertRow();
        var cell_name = row.insertCell(0);
        var cell_date = row.insertCell(1);
        var due_date = row.insertCell(2);
        due_date.id = "due" + i; // so updateTimeTillEntries can find these

        var crisis_date = new Date(bday.getTime() + crises_percent * lifespan_ms);

        var ms_till_crisis_date = crisis_date - today;

        cell_name.innerText = crises_name + ' life crisis';
        cell_date.innerText = humanTime(crisis_date);

        due_date.innerText = getPrettyTimeDelta(ms_till_crisis_date);
    }

    // Quiet update URL param
    var bday_val = document.getElementById("bday").value;
    var bday = new Date(bday_val.replace(/-/g, '/').replace('T', ' ')); // Use local timezone
    // strip seconds from ISO String: '1900-01-23T03:45:00.000Z' -> '1900-01-23T03:45Z'
    var bday_url_str = bday.toISOString().substr(0, 16) + 'Z';
    history.replaceState('', '', `?s=${sex_id}&dob=${bday_url_str}`);
}

function updateTimeTillEntries() {
    // Update time till timestamps only
    var today = new Date(); // Today
    var bday_val = document.getElementById("bday").value;
    var bday = new Date(bday_val.replace(/-/g, '/').replace('T', ' ')); // Use local timezone
    var lifespan_ms = lifespan_years * (365.25 * 24 * 60 * 60 * 1000); // in ms

    // Skip generating entries with a NaN birthday date
    if (isNaN(bday)) {
        return;
    }

    for (var i = 0; i < crises_sorted.length; i++) {
        var due_date = document.getElementById("due" + i);

        // Calculate time delta till date
        var crises_percent = crises_sorted[i][1];
        var crisis_date = new Date(bday.getTime() + crises_percent * lifespan_ms);
        var ms_till_crisis_date = crisis_date - today;

        // Update cell text
        due_date.innerText = getPrettyTimeDelta(ms_till_crisis_date);
    }
}

// Global crises
var crises_sorted = [];
function setUpCrises() {
    var crises = {};
    // Set up crises dictionary
    crises['Quarter'] = 0.25;
    crises['Mid'] = 0.5;
    crises['³⁄₄'] = 0.75;

    crises['¹⁄₃'] = 1. / 3;
    crises['²⁄₃'] = 2. / 3;

    crises['¹⁄₅'] = 1. / 5;
    crises['²⁄₅'] = 2. / 5;
    crises['³⁄₅'] = 3. / 5;
    crises['⁴⁄₅'] = 4. / 5;

    crises['⁵⁄₆'] = 5. / 6;

    crises['¹⁄₇'] = 1. / 7;
    crises['²⁄₇'] = 2. / 7;
    crises['³⁄₇'] = 3. / 7;
    crises['⁴⁄₇'] = 4. / 7;
    crises['⁵⁄₇'] = 5. / 7;
    crises['⁶⁄₇'] = 6. / 7;

    crises['First'] = 0.;
    crises['Final'] = 1.;

    // Sort the dictionary by timestamp


    for (var key in crises) crises_sorted.push([key, crises[key]]);

    crises_sorted.sort(function (a, b) {
        a = a[1];
        b = b[1];

        return a < b ? -1 : (a > b ? 1 : 0);
    });

    // Check for URL param
    checkPassedURLParam();

    // Update life crises values
    getLifeCrises();

    setInterval(function () {
        updateTimeTillEntries();
    }, 1000);
}

function simpleDateString(_date) {
    return (_date.getFullYear() + "-" + zeroPad(_date.getMonth() + 1) + "-" +
        zeroPad(_date.getDate()) + "T" + zeroPad(_date.getHours()) + ":" +
        zeroPad(_date.getMinutes()) + ":" + zeroPad(_date.getSeconds()));
}

function checkPassedURLParam() {
    // Check if URL parameter date of birth was passed, and if so
    // Set our initial dob to that.
    const urlParams = new URLSearchParams(window.location.search);
    var dob_param = urlParams.get("dob");

    if (dob_param != null) {
        var dob = new Date(dob_param);
        console.log(dob)

        if (!isNaN(dob.valueOf())) {
            // Valid date passed in URL param, update form
            document.getElementById("bday").value = simpleDateString(dob);
        }
    }

    var sex_param = urlParams.get("s");
    if (sex_param != null) {
        // male by default, so change if female
        if ((sex_param == "1") || (sex_param == "f") || (sex_param == "female")) {
            var sex_sel = document.getElementById("sex");
            sex_sel.selectedIndex = 1;
        }
    }
}

