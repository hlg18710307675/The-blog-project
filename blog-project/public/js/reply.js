;(function () {
    "use strict"
    $(function () {
        $(".reply").on("click",function () {
           var $tid = $(this).data("tid");
           var $cid = $(this).data("cid");
           if($("#toId").length>0){
               $("#toId").val($tid);
               $("#commentId").val($cid);
           }else {
               $("<input/>").attr({
                   type:"hidden",
                   name:"comment[tid]",
                   id:"toId",
                   value:$tid
               }).appendTo(".hidden-input");
               $("<input/>").attr({
                   type:"hidden",
                   name:"comment[cid]",
                   id:"commentId",
                   value:$cid
               }).appendTo(".hidden-input")
           }
        })
    })
}());
