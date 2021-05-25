import React, {useState} from 'react';
import axios from 'axios';


function Login(){

    const [stateValue, setStateValue] = useState({

        email:'',
        password:'',

    });

        const [load, setLoad] = useState(false)
        const [err, setErr] = useState('')
        const onChane = (e)=>{
            let {name, value } = e.target;

             setStateValue({...stateValue, [name]:value} )
        }

        const submit = (e)=>{
             setLoad(true)
            e.preventDefault();
            const loginUser = {
                email: stateValue.email,
                password: stateValue.password

            }
            axios.post("http://41.190.25.21:3001/login", loginUser)
            .then((res) => {
              if (res.data.status === true) {

                localStorage.setItem("token", res.data.token);
                localStorage.setItem('firstname', res.data.user.firstname)
                window.location = "/dashboard";
              } else {
                console.log('Something went wrong')

              }
            })
            .catch(err => {
                setErr('Incorrect login or network Error')
                setTimeout(()=>{ setErr('')}, 2500)
            })

        }

        const myStyle ={
            paddingTop:'3em',
            margin: 'auto',
            color: 'rgb(250, 20, 0)',
        }

        const wrap = {
            backgroundcolor:'green',
        }
        const largeBtn = {
            width: '300px'
        }

// // float-lg-right float-md-right

    return(
        <React.Fragment>

            <div className="container py-4">
                {load ? (
          <div>
            <div
              style={myStyle}
              className="fa-5x   d-flex justify-content-center align-items-center"
            >
              <i className="fas fa-spinner fa-spin"></i>
            </div>
          </div>
        ):
        <div>
               {err ? (
              <div
                className="alert my-2 alert-danger w-50 mx-auto alert-dismissible fade show"
                role="alert"
              >
                <b> {err} </b>
                <button
                  type="button"
                  className="close btn "
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            ) : (
              <span></span>
            )}  <div className='py-5 mx-5'>
                  <h4 className='mx-n2'>Sign In</h4>
                 <p className='mx-n2'>Sign into your account</p>
                  <div className="btns mx-n4">
                  <button className="btn btn-success  p-2 m-2 col-md-3 text-center">
                    <i className="fal fa-google"></i> Google
                  </button>
                  <button className="btn btn-success btn-sm p-2 m-2  col-md-3 text-center">
                    {" "}
                    <i className="fal fa-facebook"></i>{" "}
                    Facebook
                  </button>
                </div>
                <div className='clearfix '>
                <form className='' onSubmit={submit}>
                    <div  className=" fom  p-4 ">
                    <div className="row">
                    <div className="col-12  form-group ">
                      <label htmlFor="Email" className="text ">
                        Email-Address
                      </label>{" "}
                      <br />
                      <input
                        type="email"
                        onChange={onChane}
                        name="email"
                        value={stateValue.email}
                        className="form-control"
                        required
                        placeholder="zikii@gmail.com"
                      />
                    </div>

                    <div className="col-12 form-group ">
                      <label htmlFor="password" className="text ">
                        Password
                      </label>
                      <br />
                      <input
                        type="password"
                        onChange={onChane}
                        value={stateValue.password}
                        name="password"
                        className="form-control"
                        required
                        placeholder="*****"
                      />
                    </div>
                    <div className=" col-12 d-lg-none d-md-none  d-block  form-group">
                  <input
                    type="submit"
                    value="Sign Up"
                    className=" px-3 p-2 px-lg-5 bg-success btn btn-success form-control"
                  />
                </div>
                  </div>
                    </div>
                    <div className=' d-flex justify-content-between align-items-center my-3 text-nowrap'>
                    <div className=' mx-2'>
                    <label htmlFor="check" className="reme form-check-label  ">
                    <input
                      type="checkbox"
                      required
                      className="form-check-input p-2   bg-success"
                    />{" "}
                    Remember me
                  </label>
                       </div>
                       <div  className='passwrd d-lg-flex d-md-flex d-sm-none d-none '>
                  <a href="#" style={{ textDecoration:'none'}} className=" pass text-success deco-none">
                    Forgot password?
                  </a>
                </div>
                    </div>
                    <div className="sign d-lg-flex d-md-flex d-sm-none d-none">
                  <input
                    type="submit"
                    value="Sign Up"
                    className="sig px-3 bg-success btn btn-success"
                  />
                </div>

                </form>
                </div>
            </div>
        </div>
        }
            </div>

        </React.Fragment>
    )
}

export default Login
