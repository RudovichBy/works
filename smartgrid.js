module.exports = {
    // filename: "smart-grid", // название итогового файла (по умолчанию smart-grid)
    //outputStyle: "less", // препроцессор под который генерируется сетка (по умолчанию less)

    columns: 12, // Количество калонок в макете(опционально 12 или 24)
    // offset: "15px", //отступ между колонками сетки
    offset: "1.87%", //(30px/maxWidth)отступ между колонками сетки в працентах
    // Популярные значения:
    // 30px и 32px при 12 колонках
    // 10px при 24 колонках.

    mobileFirst: true,
    container: {
        maxWidth: "1400px", // настройки внешнего контейнера
        fields: "1%" //внутренние отступы контейнера Внимание! fields обязан быть >= offset / 2
        // fields: "15px" //внутренние отступы контейнера Внимание! fields обязан быть >= offset / 2
    },
    breakPoints: {
        xxl: {
            width: "1400px",
        },
        xl: {
            width: "1200px",
        },
        lg: {
            width: "992px"
        },
        md: {
            width: "768px",
            // offset: "30px",
            // fields: "15px",
        },
        sm: {
            width: "576px",
            // offset: "20px",
            // fields: "10px",
        },
        // xs: {
        //     width: "320px",
        //     // offset: "10px",
        //     // fields: "5px"
        // }
    },
    // mixinNames: {
    //     container: "wrapper",
    //     row: "row-flex",
    //     rowFloat: "row-float",
    //     rowInlineBlock: "row-ib",
    //     rowOffsets: "row-offsets",
    //     column: "col",
    //     size: "size",
    //     columnFloat: "col-float",
    //     columnInlineBlock: "col-ib",
    //     columnPadding: "col-padding",
    //     columnOffsets: "col-offsets",
    //     shift: "shift",
    //     from: "from",
    //     to: "to",
    //     fromTo: "from-to",
    //     reset: "reset",
    //     clearfix: "clearfix",
    //     debug: "debug",
    //     uRowFlex: "u-row-flex",
    //     uColumn: "u-col",
    //     uSize: "u-size"
    // },
    // tab: "    ",
    // defaultMediaDevice: "screen",
    // defaultMediaDevice: " ",
    // detailedCalc: false
};