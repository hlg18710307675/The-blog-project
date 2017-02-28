$(function () {
    $("#doubanSync").on("blur",function () {
        var id = $(this).val();
        if(id){
            $.ajax({
                type:"get",
                url:"https://api.douban.com/v2/movie/subject/"+id,
                dataType:"jsonp",
                success:function (data) {
                    if(data){
                        $("#inputTitle").val(data.aka[0]);
                        $("#inputDoctor").val(data.directors[0].name);
                        $("#inputCountry").val(data.countries[0]);
                        $("#inputPoster").val(data.images.large);
                        $("#inputYear").val(data.year);
                        $("#inputSummary").val(data.summary);
                    }
                }
            })
        }
    })
})
