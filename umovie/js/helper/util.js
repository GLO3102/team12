define([], function () {
    var resizer = function changeResolutionTo1000x1000(URLstr) {
        return URLstr.replace("100x100", "1000x1000");
    };

    return resizer;
});
