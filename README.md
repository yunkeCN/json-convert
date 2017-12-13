[![Build Status](https://travis-ci.org/yunkeCN/json-convert.svg?branch=master)](https://travis-ci.org/yunkeCN/utils)
# scheme parse
结构化的数据

# 场景
想像有一天，产品经理给出了一个需求。你和后台确定了接口数据：
```json
{
    "x": {
        name: "X man",
        money: 1000,
        count: 2
    },
    "y": {
        name: "S man",
        money: 25.78,
        count: 3
    }
}
```

接着你mock了数据并且根据mock的数据完成了前端页面。看着你的页面你很欣慰的下班回家了。

当后端人员也完成了功能，前后端联调的时候，你发现。数据的返回根本不是你想像的那样。

- 类型不一致
    - Number变成了String，应该是1000的用"1000"来返回了
    - Boolean变成了String或者Number, true用1, "1"来返回
- 该有的没有
    - 应该返回的x、y只返回了x。

他们说，数据库里存的就是使用String来保存数值类型的，用0来表示false,用1来表示true。还说，有些值是没有的。前端自己兼容一下显示吧。

# 这会造成什么问题？

- `const { name } = data.x` 可能由于x不存在而报错.
- `data.type === 1` 可能由于type的类型不是Number而永远为false. (对于不想使用==来解决的同学们这就是一个困扰)
- 在react中, show && `<div>hello</div>` 可能由于show为0而在界面上显示0。

这些种种问题就是因为你不能信任后端返回的数据结构。然后在缝缝补补中你写了很多的if。悄悄地在字里行间留下了坑。

# scheme_parse 为了结构化的数据而生
一个简单的例子：
```javascript
import { convert } from 'scheme_parse'
const scheme = {
    whatever: {
        name: String,
        money: Number,
        isDone: Boolean,
        other: [Number]
    }
}
const parseData = convert(scheme, dataFromServer);
```
parseData的结构一定包含一个whatever。whatever中一定有String型的name,Number型的money,Boolean型的isDone,和Number[]型的other。

即使dataFromServer是null是{}。解析出来的数据型也不会错。

# 小问题

`name: String`的含义，其实是找到对应key的value然后把value通过String调用后返回。有的时候由于缺少name字段可能造成`String(undefined)`返回一个"undefined"。为了解决这个问题。可以使用pure函数:

`name: pure(String)`会在值非null和非undefined的时候。才调用String，否则还是返回null或者undefined。`pure(Number)`总是会返回一个数字不包括NaN。

而有的时候有些字段，的确是可能为undefined可能为null的情况。使用maybe函数。保留null和undefined的情况。maybe(Number)可能返回一个数字。也可能返回null或者undefined。

你也可能有一些类型。基础类型没法描述的。比如一个类型:
```javascript
const type1 = {
    name: String,
    count: Number
}
const type2 = (num) => {
    return num ? num : "--"
}
const scheme = {
    x: type1,
    y: type2
}
```
如上所示，type1,和type2都可以定义新的类型。对象字面量和函数都是管用的。

如果你有一些数据，你不想转换。你可以使用这样:

```javascript
const scheme = {
    retCode: Number,
    isPass: Boolean,
}
const data = {
    retCode: "0",
    isPass: "false",
    name: "xj"
}
const schemeData = convert(scheme, data, { defaultParser: true })
expect(schemeData).to.deep.equal({
    retCode: 0,
    isPass: true,
    name: "xj"
})
```
defaultParse默认是一个id函数，输入什么输出什么。也可以是一个自定义的函数。用保留你不关心的其它数据。