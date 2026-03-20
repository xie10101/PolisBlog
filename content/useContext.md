**描述：** 当需要对某些数据(方法或属性)进行跨组件传递时，多次的 props 传值过于麻烦，React 提供 context 函数进行数据状态的统一管理与调用 ，类似于 vue 中的 store；



创建仓库：

```jsx
//context相当于一个公共的存储空间--等价于vue中的store（状态管理仓库）
/*
1. 主要学习设置方式--存放方式--拿去使用方式
2. 需要注意的事项
*/
import React from "react";

//使用React.createContext方法进行创建参数是一个对象
//返回值为参数值对象

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  totalPrice: 0,
  addItem: () => {},
  removeItem: () => {},
});

export default CartContext;

```



**三种使用方式 ：**  
1xxxContext.consumer

```jsx
import TestContext from "../../../store/cart-context";

<TestContext.Consumer>
  {(ctx) => {
  return (
    <div className="aaa">
      <h1>{ctx.age}</h1>
      <h1>{ctx.name}</h1>
    </div>
  );
}}
</TestContext.Consumer>
```

2. 钩子函数 useContext--静态使用

```jsx
import { useContext } from "react";

const testContext = useContext(TestContext);


<div className="BBB">
      {testContext.name}
      {testContext.age}
    </div>
```

3. 动态设置--xxxContext.provider 

```jsx
     <CartContext.Provider value={{ ...cartData, addItem, removeItem }}>
        <Filter onSearch={searchMeal}></Filter>
        <Meals mealsData={mealsData}></Meals>
      </CartContext.Provider>
```

```javascript
/*常用方法：设置Xxx.provider  
   value-值进行对store中数据进行重新设置，其
   包含的子组件会使用生产者设置的值（实质像是
   对store仓库中数据及进行了复制更改,子组件中访问路径没有改变） 
   */
```

注意项：

1. **不建议直接修改 useContext 的初始值，常常使用 State 值进行替换，子组件一般通过使用/修改新赋予的 State 值达到目的（重新渲染组件）**

****

**<font style="background-color:#FBDE28;">使用时需要 XXXContext.Provider 和 useContext 结合使用；</font>**

**      **

