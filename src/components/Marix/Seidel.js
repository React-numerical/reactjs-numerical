import { useState } from "react"
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { Line } from "react-chartjs-2";

const Seidel =()=>{
    const data =[];
    const [valueIter, setValueIter] = useState([0]);
    const [valueX1, setValueX1] = useState([0]);
    const [valueX2, setValueX2] = useState([0]);
    const [valueX3, setValueX3] = useState([0]);
    const [valueX4, setValueX4] = useState([0]);
    const [chartHtml, setchartHtml] = useState(null);

    const print = (arr) =>{
        setValueIter(data.map((x)=>x.Iteration))
        setValueX1(data.map((x)=>x.x1))
        setValueX2(data.map((x)=>x.x2))
        setValueX3(data.map((x)=>x.x3))
        setValueX4(data.map((x)=>x.x4))
        return(
            <Table className="justify-content-md-center" striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Iteration</th>
                        <th>X1</th>
                        <th>X2</th>
                        <th>X3</th>
                        <th>X4</th>
                    </tr>
                </thead>
                <tbody>
                    {arr.map((element, index)=>{
                        return  (
                        <tr key={index}>
                            <td>{element.Iteration}</td>
                            <td>{element.x1}</td>
                            <td>{element.x2}</td>
                            <td>{element.x3}</td>
                            <td>{element.x4}</td>
                        </tr>)
                    })}
                </tbody>
            </Table>
        );
    }

    const [input00, set00] = useState(5);
    const [input01, set01] = useState(2);
    const [input02, set02] = useState(0);
    const [input03, set03] = useState(0);
    const [input04, set04] = useState(12);

    const [input10, set10] = useState(2);
    const [input11, set11] = useState(5);
    const [input12, set12] = useState(2);
    const [input13, set13] = useState(0);
    const [input14, set14] = useState(17);

    const [input20, set20] = useState(0);
    const [input21, set21] = useState(2);
    const [input22, set22] = useState(5);
    const [input23, set23] = useState(2);
    const [input24, set24] = useState(14);

    const [input30, set30] = useState(0);
    const [input31, set31] = useState(0);
    const [input32, set32] = useState(2);
    const [input33, set33] = useState(5);
    const [input34, set34] = useState(7);
    
    const [html, setHtml] = useState(null);

    const n = 4;
    const fill2DimensionsArray = (arr, rows, columns) => {
        for (var i = 0; i < rows; i++) {
            arr.push([0])
            for (var j = 0; j < columns; j++) {
                arr[i][j] = 0;
            }
        }
    }


    const update = (ans, xold) =>{
        var i;
        for (i = 0; i < n; i++) {
            xold[i] = ans[i];
        }
        
    }
    
    const error = (ans0,ans) =>{
        var e = Math.abs(ans0-ans);
        return e
    }
    
   const round = (num, place) =>{
        if (num < 0)
            return -round(-num, place);
        var p = Math.pow(10, place);
        var n = (num * p).toPrecision(15);
        return Math.round(n) / p;
    }
    
    const print1 = (iter, ans, n) =>{
        console.log("Iteration:"+iter)
        for (var i = 0; i < n; i++) {
            console.log("x"+(i+1)+": "+(round(ans[i],4)));
        }
    }
    
    const calSeidel = (x) =>{
        var i, j;
        var ans0;
        var ans = [0, 0, 0, 0];
        var xold = [0, 0, 0, 0];
        var er = [100, 100, 100, 100];
        var e = 0.000001;
        var iter = 0;
        var obj = {}
        while(er[0]>e && er[1]>e && er[2]>e && er[3]>e){
            iter++
            for (i = 0; i < n; i++) {
                ans0 = ans[i];
                ans[i] = x[i][n];
                for (j = 0; j < n; j++) {
                    if(x[i][(j%n+n)%n]!=x[i][i]){
                        ans[i] -= x[i][(j%n+n)%n]*xold[(j%n+n)%n];
                    }
                }
                ans[i] = ans[i]/x[i][i];
                xold[i] = ans[i];
                
                er[i] = error(ans0,ans[i]);
                
            }
            obj = {
                Iteration:iter,
                x1:ans[0],
                x2:ans[1],
                x3:ans[2],
                x4:ans[3],
            }
            data.push(obj);
            print1(iter, ans, n);
        }
    }

    const calJacobi = (x) =>{
        var i, j;
        var ans0;
        var ans = [0, 0, 0, 0];
        var xold = [0, 0, 0, 0];
        var er = [100, 100, 100, 100];
        var e = 0.000001;
        var iter = 0;
        var obj = {}
        while(er[0]>e && er[1]>e && er[2]>e && er[3]>e){
            iter++
            for (i = 0; i < n; i++) {
                ans0 = ans[i];
                ans[i] = x[i][n];
                for (j = 0; j < n; j++) {
                    if(x[i][(j%n+n)%n]!=x[i][i]){
                        ans[i] -= x[i][(j%n+n)%n]*xold[(j%n+n)%n];
                    }
                }
                ans[i] = ans[i]/x[i][i];
                er[i] = error(ans0,ans[i]);
                
            }
            obj = {
                Iteration:iter,
                x1:ans[0],
                x2:ans[1],
                x3:ans[2],
                x4:ans[3],
            }
            data.push(obj);
            update(ans,xold);
        }
    }

    const Matrix = [];
    fill2DimensionsArray(Matrix, 3, 4)

    const calculateRoot = () =>{
        var a = [];
        fill2DimensionsArray(a, 4, 5)
        var b = new Array(4)
        var i,j;
        var s = "";
        for(i = 0; i<4; i++){
            for(j = 0; j<5; j++){
                s = ""+i+j;
                a[i][j] = document.getElementById(s).value;
            }
        }
        calSeidel(a)
        setHtml(print(data));
    }
    
    const [Count, setCount] = useState(0)
    const showChart = () =>{
        var state = {
            labels: valueIter,
            datasets: [
              {
                label: 'X1',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: 'black',
                borderWidth: 2,
                data: valueX1
              },
              {
                label: 'X2',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: 'red',
                borderWidth: 2,
                data: valueX2
              },
              {
                label: 'X3',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: 'green',
                borderWidth: 2,
                data: valueX3
              },
              {
                label: 'X4',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: 'blue',
                borderWidth: 2,
                data: valueX4
              }
            ]
        }
        if((Count+2)%2===0){
            setCount(Count+1);
            setchartHtml(<Line
                data={state}
                options={{
                title:{
                    display:true,
                    text:'Bisection Method',
                    fontSize:20
                    },
                legend:{
                display:true,
                position:'right'
                }
            }}
            />);
        }else{
            setCount(Count+1);
            setchartHtml(null)
        }
    }

    return (
            <Container>
                <h1>Gauss Seidel Methods</h1>
                <br></br>
                <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th xs={1}></th>
                        <th xs={6}>x1</th>
                        <th xs={6}>x2</th>
                        <th xs={6}>x3</th>
                        <th xs={6}>x4</th>
                        <th xs={6}>b</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td><input size={1} id="00" value={input00} onChange={e =>{set00(e.target.value)}}></input></td>
                            <td><input size={1} id="01" value={input01} onChange={e =>{set01(e.target.value)}}></input></td>
                            <td><input size={1} id="02" value={input02} onChange={e =>{set02(e.target.value)}}></input></td>
                            <td><input size={1} id="03" value={input03} onChange={e =>{set03(e.target.value)}}></input></td>
                            <td><input size={1} id="04" value={input04} onChange={e =>{set04(e.target.value)}}></input></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td><input size={1} id="10" value={input10} onChange={e =>{set10(e.target.value)}}></input></td>
                            <td><input size={1} id="11" value={input11} onChange={e =>{set11(e.target.value)}}></input></td>
                            <td><input size={1} id="12" value={input12} onChange={e =>{set12(e.target.value)}}></input></td>
                            <td><input size={1} id="13" value={input13} onChange={e =>{set13(e.target.value)}}></input></td>
                            <td><input size={1} id="14" value={input14} onChange={e =>{set14(e.target.value)}}></input></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td><input size={1} id="20" value={input20} onChange={e =>{set20(e.target.value)}}></input></td>
                            <td><input size={1} id="21" value={input21} onChange={e =>{set21(e.target.value)}}></input></td>
                            <td><input size={1} id="22" value={input22} onChange={e =>{set22(e.target.value)}}></input></td>
                            <td><input size={1} id="23" value={input23} onChange={e =>{set23(e.target.value)}}></input></td>
                            <td><input size={1} id="24" value={input24} onChange={e =>{set24(e.target.value)}}></input></td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td><input size={1} id="30" value={input30} onChange={e =>{set30(e.target.value)}}></input></td>
                            <td><input size={1} id="31" value={input31} onChange={e =>{set31(e.target.value)}}></input></td>
                            <td><input size={1} id="32" value={input32} onChange={e =>{set32(e.target.value)}}></input></td>
                            <td><input size={1} id="33" value={input33} onChange={e =>{set33(e.target.value)}}></input></td>
                            <td><input size={1} id="34" value={input34} onChange={e =>{set34(e.target.value)}}></input></td>
                        </tr>
                    </tbody>
                </Table>  
                <br></br>
                <Container>
                <Row>
                    <Col>
                        <Table striped bordered hover variant="dark">
                            <thead><tr><th colSpan={4}>matrix A</th></tr></thead>
                            <tbody>
                                <tr>
                                    <td>{input00}</td>
                                    <td>{input01}</td>
                                    <td>{input02}</td>
                                    <td>{input03}</td>
                                </tr>
                                <tr>
                                    <td>{input10}</td>
                                    <td>{input11}</td>
                                    <td>{input12}</td>
                                    <td>{input13}</td>
                                </tr>
                                <tr>
                                    <td>{input20}</td>
                                    <td>{input21}</td>
                                    <td>{input22}</td>
                                    <td>{input23}</td>
                                </tr>
                                <tr>
                                    <td>{input30}</td>
                                    <td>{input31}</td>
                                    <td>{input32}</td>
                                    <td>{input33}</td>
                                </tr>
                            </tbody>
                        </Table>  
                    </Col>
                    <Col>
                        <Table striped bordered hover variant="dark">
                            <thead><tr><th colSpan={3}>matrix B</th></tr></thead>
                            <tbody>
                                <tr>
                                    <td>{input04}</td>
                                </tr>
                                <tr>
                                    <td>{input14}</td>
                                </tr>
                                <tr>
                                    <td>{input24}</td>
                                </tr>
                                <tr>
                                    <td>{input34}</td>
                                </tr>
                            </tbody>
                        </Table> 
                    </Col>
                </Row>
                </Container>
                </Container>
                <Button variant="dark" onClick={calculateRoot}>
                    Calculate
                </Button>
                <Container>
                <br></br> 
                {html}
                <br></br>
                </Container>
                <Button variant="light"><img width={50} height={50} src="./chart1.png" alt="my image" onClick={showChart}/></Button>
                <br></br>
                {chartHtml}
            </Container> 
    )
}

export default Seidel





