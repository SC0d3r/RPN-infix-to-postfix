# RPN 
<p align="center">
  <img src = 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Jan_%C5%81ukasiewicz.jpg' width = '400' height = '400'/>
  <br>Jan Łukasiewicz <i>(Inventor of RPN)</i>
</p>

## Infix to postfix

> Reverse Polish notation (RPN), also known as Polish postfix notation or simply postfix notation, is a mathematical notation in which operators follow their operands, in contrast to Polish notation (PN), in which operators precede their operands. It does not need any parentheses as long as each operator has a fixed number of operands. The description "Polish" refers to the nationality of logician Jan Łukasiewicz, who invented Polish notation in 1924  &nbsp;&nbsp;&nbsp;&nbsp;-*Wikipedia*

<br>

## Downloading
```
git clone https://github.com/SC0d3r/RPN-infix-to-postfix.git RPN
```
## Usage
```javascript
> node index.js '1* ( 2 + 3)'
 
    > 5 [result]
```
### only posfix version

```javascript
> node index.js '1* ( 2 + 3)' -postfix
 
   > 123+* [result]
```

## Test
### run tests with
``` > npm test ```

 