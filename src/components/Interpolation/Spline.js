import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";





const Spline =()=>{
    const data = [
        {index: 1, X:2, Y:9.5},
        {index: 2, X:4,Y:8.0},
        {index: 3, X:6, Y:10.5},
        {index: 4, X:8, Y:39.5},
        {index: 5, X:10,Y:72.5}
    ]
    
    const dataQuadratic =[];

    const print = () =>{
        return(
            <Container>
                <h3>Quadratic Spline</h3>
                <h5>f{N-1}(x) = a{N-1}(x^2)+b{N-1}(x)+c{N-1}</h5>
                <h8>f{N-1}({X}) = ({dataQuadratic[N-2].A})({X}^2)+({dataQuadratic[N-2].B})({X})+({dataQuadratic[N-2].C})</h8>
                <h5>Answer = {AnsQuad.toPrecision(7)}</h5>
                <br></br>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th width="30%">A</th>
                        <th width="30%">B</th>
                        <th width="30%">C</th>
                    </tr>
                </thead>
                <tbody>
                    {dataQuadratic.map((element, index)=>{
                        return  (
                        <tr key={index}>
                            <td>a{element.Pos} = {element.A}</td>
                            <td>b{element.Pos} = {element.B}</td>
                            <td>c{element.Pos} = {element.C}</td>
                        </tr>)
                    })}
                </tbody>
            </Table>
            </Container>
        );
    }

    const [html, setHtml] = useState(null);
    const [N,setN] = useState(0)
    const [X,setX] = useState(0)
    const [AnsLinear,setAnsLinear] = useState(0);
    const [AnsQuad, setQuad ] = useState(0);

    const fill2DimensionsArray = (arr, rows, columns) => {
        for (var i = 0; i < rows; i++) {
            arr.push([0])
            for (var j = 0; j < columns; j++) {
                arr[i][j] = 0;
            }
        }
    }
    
    const diagonalize = (M) => {
      var m = M.length;
      var n = M[0].length;
      for(var k=0; k<Math.min(m,n); ++k) {
        var i_max = findPivot(M, k);
        if (M[i_max, k] === 0)
          throw "matrix is singular";
        swap_rows(M, k, i_max);
        for(var i=k+1; i<m; ++i) {
          var c = M[i][k] / M[k][k];
          for(var j=k+1; j<n; ++j) {
            M[i][j] = M[i][j] - M[k][j] * c;
          }
          M[i][k] = 0;
        }
      }
    }
    
    const findPivot = (M, k) => {
      var i_max = k;
      for(var i=k+1; i<M.length; ++i) {
        if (Math.abs(M[i][k]) > Math.abs(M[i_max][k])) {
          i_max = i;
        }
      }
      return i_max;
    }
    
    const swap_rows = (M, i_max, k) => {
      if (i_max !== k) {
        var temp = M[i_max];
        M[i_max] = M[k];
        M[k] = temp;
      }
    }
    
    const makeM = (a, b) => {
      for(var i=0; i<a.length; ++i) {
        a[i].push(b[i]);
      }
    }
    
    const substitute = (M) => {
      var m = M.length;
      for(var i=m-1; i>=0; --i) {
        var x = M[i][m] / M[i][i];
        for(var j=i-1; j>=0; --j) {
          M[j][m] -= x * M[j][i];
          M[j][i] = 0;
        }
        M[i][m] = x;
        M[i][i] = 1;
      }
    }
    
    const extractX = (M) => {
        var a, b , c;
        var pos = 0;
        var x = [];
        var m = M.length;
        var n = M[0].length;
        var obj={};
        for(var i=0; i<m; ++i){
            
            x.push(M[i][n-1]);
            if(i===0){
                a = 0;
            }
            else if(((i+3)%3)===0){
                a = x[i];
            }
            else if(((i+3)%3)===1){
                b = x[i];
            }
            else if(((i+3)%3)===2){
                c = x[i];
                pos++;
                obj = {
                    Pos:pos,
                    A:a,
                    B:b,
                    C:c
                }
                dataQuadratic.push(obj)
            }
            
        }
        return x;
    }
    
    const solve = (a, b) => {
      makeM(a,b);
      diagonalize(a);
      substitute(a);
      var x = extractX(a);
      
      return x;
    }
    
    const LinearSpline = (pos1, pos2) => {
        pos1--;
        pos2--;
        var m = (data[pos2].Y-data[pos1].Y)/(data[pos2].X-data[pos1].X)
        var ans = data[pos1].Y+m*(X-data[pos1].X)
        setAnsLinear(ans);
    }
    
    const QuadraticSpline = (n) => {
        var i, j, k;
        var a = new Array((n*3)+1).fill(0);
        var b = new Array((n*3)+1).fill(0);
        var c = new Array(n*3).fill(1);
        var d = new Array(n*3).fill(0);
        var e = [];
        fill2DimensionsArray(e, n*3, n*3)
    
    
        for(i=0;i<n;i++){
            for(j=i;j<=i+1;j++){ 
                a[i+j] = Math.pow(data[j].X,2);
                b[i+j] = data[j].X;
                d[i+j] = data[j].Y;
            }
        }
        for(i=n;i<=n+(n%3)+1;i++){
            for(j=0;j<=1;j++){
                if (j===0){
                    a[2*i+j] = 2*data[i-(n-1)].X;
                    b[2*i+j] = 1;
                    c[2*i+j] = 0;
                }
                else{
                    a[2*i+j] = (-2)*data[i-(n-1)].X
                    b[2*i+j] = -1;
                    c[2*i+j] = 0;
                }
            }
        }
        j=0;
        do{
            if(j===0){
                i=j
            }else if(j%2===0){
                i=j+j/2
            }
                for(k=i;k<i+3;k++){
                    if(((k+3)%3)===0){
                        e[j][k] = a[j];
                    }
                    else if(((k+3)%3)===1){
                        e[j][k] = b[j];
                    }
                    else if(((k+3)%3)===2){
                        e[j][k] = c[j];
                    }
                }
            j++;
        }while(j<(2*n))
    
        i=0
        var num=j;
        for(j=2*n;j<(2*n)+3;j++){
            for(k=i; k<i+(6);k++){
                if(((k+3)%3)===0){
                    e[j][k] = a[num];
                }
                else if(((k+3)%3)===1){
                    e[j][k] = b[num];
                }
                else if(((k+3)%3)===2){
                    num++;
                }
            }
    
            i=k-3;
        }
        e[(n*3)-1][0] = 1;
        var f = solve(e, d);
        var ans = f[n+2]*Math.pow(7,2)+(f[n+3])*(7)+(f[n+4])
        setQuad(ans);
    }

    const inputN = (event) =>{
        setN(event.target.value)
    }

    const inputX = (event) =>{
        setX(event.target.value)
    }

    const calculateRoot = () =>{
        var n = parseInt(N)
        LinearSpline(n-1, n)
        QuadraticSpline(n)
        setHtml(print());
    }
    
    return (
            <Container>
                <h1>Spline Interpolation Method</h1>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="20%">Position</th>
                            <th width="40%">X</th>
                            <th width="40%">Y</th>
                        </tr>
                    </thead>
                <tbody>
                    {data.map((element, index)=>{
                        return  (
                        <tr key={index}>
                            <td>{element.index}</td>
                            <td>{element.X}</td>
                            <td>{element.Y}</td>
                        </tr>)
                    })}
                </tbody>
                </Table>
                <Container>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Input number of point</Form.Label>
                                <input type="number" id="N" onChange={inputN} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                            </Form.Group>
                                <div id="NumberInput"></div>
                            <br></br>
                                <Form.Label>Input X</Form.Label>
                                <input type="number" id="X" onChange={inputX} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                            <br></br>
                            <Button variant="dark" onClick={calculateRoot}>
                                Calculate
                            </Button>
                        </Form>
                        <br></br>
                <h4>Linear Spline</h4>
                <h5>Answer = {AnsLinear.toPrecision(7)}</h5>
                
                <Container>
                {html}
                </Container>
                </Container>
            </Container> 
    )
}

export default Spline





