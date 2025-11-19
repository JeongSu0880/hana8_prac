// const today = new Date();

// let day = today.getDay();

// const WEEK_NAME = '일월화수목금토'

// console.log(`오늘은 ${WEEK_NAME[day]}요일입니다.`)

// function getWeekName(date) {
//     const date = arguments[0]; //전달 받은 값을 배열로 가지고 있는 것임.
//     console.log("🚀 ~ getWeekName ~ date:", date)

// }

function getWeekName(date) {
    // if (date === undefined) date = new Date();
    date = date ?? new Date();
    console.log('date : ', date);

    let weekName;
    switch (date.getDay()) {
        case 0:
            weekname = '일'

    }
}
// getWeekName(new Date());
getWeekName();