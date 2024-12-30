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
        var posOfTemp2 = productLink.indexOf("--i.");
        if(posOfTemp == -1 && posOfTemp2 == -1)
        {
            document.getElementById("thongbaoLink").innerHTML = "Link chưa đúng, vui lòng coi hướng dẫn";
        }
        else
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
                productLink = productLink.substring(posOfTemp2 + 4);
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
            var finalScript ="async function getData(url = \"\") {\n" +
            "  const response = await fetch(url, {\n" +
            "    method: \"GET\",\n" +
            "    headers: {\n" +
            "      \"Content-Type\": \"application/json\",\n" +
            "    },\n" +
            "  });\n" +
            "  return response.json();\n" +
            "}\n" +
            "getData(\"https://shopee.vn/api/v4/pdp/get_pc?item_id="+itemID+"&shop_id="+shopID+"\").then((data) => {\n" +
            "  var qty = "+qty+";\n" +
            "  var i = 0;\n" +
            "  var numberOfModels = data.data.item.models.length;\n" +
            "  var productName = data.data.item.title;\n" +
            "  var shopName = data.data.shop_detailed.account.username;\n" +
            "  var item_id = data.data.item.item_id;\n" +
            "  var shop_id = data.data.item.shop_id;\n" +
            "  var new_window = window.open('');\n" +
            "  for (const item of data.data.item.models) {\n" +
            "    var model_id = item.model_id;\n" +
            "    var finalLink = \"<textarea id='\"+i+\"' readonly style='font-size: 25px; width: 100%; height: 200px;'>\" + \"https://shopee.vn/marketplace-checkout?cartType=1&cid=5&orders=%5B%7B%22shop%22%3A%7B%22shopid%22%3A\" +shop_id+ \"%7D%2C%22items%22%3A%5B%7B%22itemid%22%3A\" +item_id+ \"%2C%22modelid%22%3A\" + model_id + \"%2C%22quantity%22%3A\" + qty + \"%7D%5D%7D%5D\" + \"</textarea>\";\n" +
            "    var productInfo = '<h1>' + shopName +' - ' + productName;\n" +
            "    if(numberOfModels > 1)\n" +
            "    {\n" +
            "        const textarea = document.createElement(\"textarea\");\n" +
            "        textarea.innerHTML = item.name.replace(/\\\\u/g, \"&#x\");\n" +
            "        productInfo = productInfo + ' - Phân loại: ' + textarea.value;\n" +
            "    }\n" +
            "    productInfo = productInfo + ' - Số lượng: ' + qty + '</h1>';\n" +
            "    new_window.document.write(productInfo);\n" +
            "    new_window.document.write(finalLink);\n" +
            "    new_window.document.write(\"<button style=\\\"width: 100%; height: 100px; background-color:#04AA6D; color: white; font-size: 35px;\\\" onclick=\\\"{\\nlet textarea = document.getElementById('\"+i+\"');\\ntextarea.select();\\ndocument.execCommand('copy');}\\\"> Copy</button>\");\n" +
            "    i++;\n" +
            "  }\n" +
            "});";
            finalLink.value = finalScript;
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
    document.getElementById("result").innerHTML = "Javascript:";
    document.getElementById("productLink").style.display ='';
    document.getElementById("changeList").style.display =''; 
    document.getElementById("changeItem").style.display ='none';
    document.getElementById("selectList").style.display ='none';
    reset();
}
