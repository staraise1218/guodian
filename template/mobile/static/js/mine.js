;(function () {
    $('.search').change(function () {
        var url = $(this).attr("data-href");
        var q = $(this).val();
        if(!q){
            return false;
        }
        url +='?q='+q
        window.location.href=url;
    })
})();
