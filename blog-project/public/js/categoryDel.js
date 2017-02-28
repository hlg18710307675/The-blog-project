$(function () {
    $(".del").on("click",function (e) {
        e.preventDefault();
        e.stopPropagation();
        var id = $(this).data("id");
        var $tr = $(".item-id-"+id);
        $.ajax({
            type:"DELETE",
            url:"/admin/movie/category/del?id="+id
        })
            .done(function (result) {
                if (result.success === 1 ){
                    if ($tr){
                        $tr.remove()
                    }
                }
            })
    })
})


