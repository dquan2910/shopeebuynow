function changeLink()
{
    var productLink = document.getElementById("productLink").value;
    var finalLink = document.getElementById("finalLink");
    if(productLink == "")
    {
        document.getElementById("thongbaoLink").innerHTML = "Vui lòng điền link.";
    }
    else
    {
        var posOfTemp = productLink.indexOf("/product/");
        var posOfTemp2 = productLink.indexOf("-i.");
        var posOfTemp3 = productLink.indexOf("modelid%22%3A");
        if(posOfTemp == -1 && posOfTemp2 == -1 && posOfTemp3 == -1)
        {
            document.getElementById("thongbaoLink").innerHTML = "Link chưa đúng, vui lòng coi hướng dẫn";
        }
        else if(posOfTemp3 == -1)
        {
            var tempPos, shopID, itemID;
            document.getElementById("thongbaoLink").innerHTML = "";
            if(posOfTemp != -1)
            {
                productLink = productLink.substring(posOfTemp + 9);
                tempPos = productLink.indexOf("/");
                shopID = productLink.substring(0, tempPos);
                itemID = productLink.substring(tempPos +1, productLink.indexOf("?"));
            }
            if(posOfTemp2 != -1)
            {
                productLink = productLink.substring(posOfTemp2 + 3);
                tempPos = productLink.indexOf(".");
                shopID = productLink.substring(0, tempPos);
                productLink = productLink.substring(tempPos+1);
                tempPos = productLink.indexOf("?");
                if(tempPos == -1)
                {
                    itemID = productLink.substring(0);
                }
                else
                    itemID = productLink.substring(0, tempPos);

            }
            var qtyraw = document.getElementById("quantity").value;
            let qty = 1;
            if(qtyraw != "")
                qty = parseInt(qtyraw, 10);
            if(qty < 1)
                qty = 1;
            var finalScript = "fetch('https://dquan2910.github.io/shopeebuynow/script.js')\n" +
                            ".then(response => response.text())\n" +
                            ".then(scriptContent => {\n" +
                            "  var finalScript = scriptContent.replace('itemIDTemp', '" + itemID + "')\n" +
                            "                                 .replace('shopIDTemp', '" + shopID + "')\n" +
                            "                                 .replace('qtyTemp', '" + qty + "');\n" +
                            "  var s = document.createElement('script'); s.type = 'text/javascript';\n" +
                            "  s.text = finalScript;\n" +
                            "  document.head.appendChild(s);\n" +
                            "});";
            if(document.getElementById("finalLink").value.indexOf("fetch") == 0)
                {
                    finalScript = "avascript: " + finalLink.value;
                }
                finalLink.value = finalScript;
        }
        else
        {
            document.getElementById("thongbaoLink").innerHTML = "";
            var qtyraw = document.getElementById("quantity").value;
            let qty = 1;
            if(qtyraw != "")
                qty = parseInt(qtyraw, 10);
            if(qty < 1)
                qty = 1;
            var tempPos = productLink.indexOf("quantity%22%3A");
            productLink = productLink.substring(0, tempPos+14);
            finalLink.value = productLink + qty + "%7D%5D%7D%5D";;

        }

    }
}
function changeItem()
{
    var selectedItem = document.getElementById("selectedItem").value;
    var finalLink = document.getElementById("finalLink");
    if(selectedItem == "")
    {
        document.getElementById("thongbaoLink").innerHTML = "Vui lòng chọn sản phẩm";
    }
    else
    {
        var qtyraw = document.getElementById("quantity").value;
        let qty = 1;
            if(qtyraw != "")
                qty = parseInt(qtyraw, 10);
            if(qty < 1)
                qty = 1;
        var finalResult = selectedItem + qty + "%7D%5D%7D%5D";
        finalLink.value = finalResult;
    }
}
function copyLink()
{
    let textarea = document.getElementById("finalLink");
    if(textarea.value == "")
    {
        document.getElementById("thongbaoLink").innerHTML = "Chưa có gì copy làm chi :v";
    }
    else
    {
        textarea.select();
        document.execCommand("copy");
        document.getElementById("thongbaoLink").innerHTML = "Đã copy!!!";
    }
}
function reset()
{
    document.getElementById("quantity").value = "";
    document.getElementById("productLink").value = "";
    document.getElementById("finalLink").value = "";
    document.getElementById("thongbaoLink").innerHTML = "";
    document.getElementById("selectedItem").value = "0";
    
}
function listLink()
{
    document.getElementById("title").innerHTML = "List sản phẩm có sẵn:";
    document.getElementById("result").innerHTML = "Link buy now:";
    document.getElementById("productLink").style.display ='none'; 
    document.getElementById("changeList").style.display ='none'; 
    document.getElementById("changeItem").style.display =''; 
    document.getElementById("selectList").style.display ='';
    reset();
}
function createJavascript()
{
    document.getElementById("title").innerHTML = "Link sản phẩm dài:";
    document.getElementById("result").innerHTML = "Javascript/Link:";
    document.getElementById("productLink").style.display ='';
    document.getElementById("changeList").style.display =''; 
    document.getElementById("changeItem").style.display ='none';
    document.getElementById("selectList").style.display ='none';
    reset();
}
