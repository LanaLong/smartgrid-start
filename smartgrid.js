module.exports = {
    columns: 12,
    offset: '30px',
    mobileFirst: false,
    container: {
        maxWidth: "950px",
        fields: "30px"
    },
    breakPoints: {
        md: {
            width: "992px"
        },
        sm: {
            width: "720px",
        	fields: "20px"
        },
        xs: {
            width: "576px",
        	fields: "15px",
        },
        xxs: {
        	width: "400px",
            fields: "5px",
            offset: "10px"
        }
    }
};