import { Component } from "react"
import { Card, CardGroup, Container } from "react-bootstrap"

export class Home extends Component {
    render(){
        return(
            <Container>
                <br></br>
                <CardGroup>
                    
                    <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Standard Methods</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Bracketing methods</Card.Subtitle>
                        <Card.Text>
                        Bracketing methods determine successively smaller intervals (brackets) that contain a root. When the interval is small enough, then a root has been found. They generally use the intermediate value theorem, which asserts that if a continuous function has values of opposite signs at the end points of an interval, then the function has at least one root in the interval. Therefore, they require to start with an interval such that the function takes opposite signs at the end points of the interval. 
                        </Card.Text>
                        <Card.Link href="/bisection">Bisection</Card.Link>
                        <Card.Link href="/falseposition">FalsePosition</Card.Link>
                    </Card.Body>
                    </Card>
                    
                    <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Standard Methods</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Iterative methods</Card.Subtitle>
                        <Card.Text>
                        Although all root-finding algorithms proceed by iteration, an iterative root-finding method generally uses a specific type of iteration, consisting of defining an auxiliary function, which is applied to the last computed approximations of a root for getting a new approximation. The iteration stops when a fixed point (up to the desired precision) of the auxiliary function is reached, that is when the new computed value is sufficiently close to the preceding ones.
                        </Card.Text>
                        <Card.Link href="/onepoint">OnePoint</Card.Link>
                        <Card.Link href="/newtonraphson">NewtonRaphson</Card.Link>
                        <Card.Link href="/secant">Secant</Card.Link>
                    </Card.Body>
                    </Card>

                    <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Interpolation Methods</Card.Title>
                        <Card.Text>
                        Many root-finding processes work by interpolation. This consists in using the last computed approximate values of the root for approximating the function by a polynomial of low degree, which takes the same values at these approximate roots. Then the root of the polynomial is computed and used as a new approximate value of the root of the function, and the process is iterated.
                        </Card.Text>
                        <Card.Link href="/lagrange">Lagrange</Card.Link>
                        <Card.Link href="/spline">Spline</Card.Link>
                    </Card.Body>
                    </Card>
                </CardGroup>
            </Container>
            
        ) 
    }
}