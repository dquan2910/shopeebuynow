function changeLink()
{
    var auth = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVfdGltZSI6MTczNDMxMzczMywiaWQiOiJlN2FlZDYwMC1iYjRmLTExZWYtOWE0NC05YWFjNWI0MGRkODgifQ.maDNZa4j85NnH2j62Bh3WwIJwjERt252MnTAKkCUjcU";
    var productLink = document.getElementById("productLink").value;
    var finalLink = document.getElementById("finalLink");
    if(productLink == "")
    {
        document.getElementById("thongbaoLink").innerHTML = "Vui lòng điền link.";
    }
    else
    {
        var posOfTemp = productLink.indexOf("/product/");
        if(posOfTemp == -1)
        {
            document.getElementById("thongbaoLink").innerHTML = "Link chưa đúng, vui lòng coi hướng dẫn";
        }
        else
        {
            document.getElementById("thongbaoLink").innerHTML = "";
            productLink = productLink.substring(posOfTemp + 9);
            var tempPos = productLink.indexOf("/");
            var shopID = productLink.substring(0, tempPos);
            var itemID = productLink.substring(tempPos +1, productLink.indexOf("?"));
            var qtyraw = document.getElementById("quantity").value;
            let qty = 1;
            if(qtyraw != "")
                qty = parseInt(qtyraw, 10);
            if(qty < 1)
                qty = 1;
            var finalScript ="async function postData(url = \"\") {\n" +
            "  const response = await fetch(url, {\n" +
            "    method: \"GET\",\n" +
            "    headers: {\n" +
            "      \"Content-Type\": \"application/json\",\n" +
            "      authorization: \""+auth+"\"\n" +
            "    },\n" +
            "  });\n" +
            "  return response.json();\n" +
            "}\n" +
            "postData(\"https://banhang.shopee.vn/webchat/api/v1.2/mini/products/"+itemID+"?shop_id="+shopID+"\").then((data) => {\n" +
            "  var qty = "+qty+";\n" +
            "  var model_id = data.models[0].model_id;\n" +
            "  var finalLink = \"<textarea id='temp' readonly style='font-size: 25px; width: 100%; height: 200px;'>\" + \"https://shopee.vn/marketplace-checkout?cartType=1&cid=5&orders=%5B%7B%22shop%22%3A%7B%22shopid%22%3A\" +"+shopID+"+ \"%7D%2C%22items%22%3A%5B%7B%22itemid%22%3A\" +"+itemID+"+ \"%2C%22modelid%22%3A\" + model_id + \"%2C%22quantity%22%3A\" + qty + \"%7D%5D%7D%5D\" + \"</textarea>\";\n" +
            "  var productInfo = '<h1>' + data.name + ' - Số lượng: ' + qty + '</h1>' \n" +
            "  var new_window = window.open('');\n" +
            "  new_window.document.write(productInfo);\n" +
            "  new_window.document.write(finalLink);\n" +
            "  new_window.document.write(\"<button style=\\\"width: 100%; height: 100px; background-color:#04AA6D; color: white; font-size: 35px;\\\" onclick=\\\"{\\nlet textarea = document.getElementById('temp');\\ntextarea.select();\\ndocument.execCommand('copy');}\\\"> Copy</button>\");\n" +
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
