/**
 * Created by duanyan on 2018/5/28.
 */
function createCode()
{
    code = "";
    var codeLength = 4;//验证码的长度
    var checkCode = document.getElementById("getCode");
    var selectChar = new Array(0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','wW','x','y','z');//所有候选组成验证码的字符，当然也可以用中文的
    for(var i=0;i<codeLength;i++)
    {
        var charIndex = Math.floor(Math.random()*36);
        code +=selectChar[charIndex];
    }
    if(checkCode)
    {
        checkCode.className="code input1";
        checkCode.value = code;

    }
}