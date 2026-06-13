import Header from "../components/Header";
import LoginForm from "../components/Login/LoginForm";
function Login() {

        return (

            //De momento con datos estáticos, luego se conectará a una API para obtener los datos reales
            <div className="min-h-screen bg-black text-white">
                <Header />

                <LoginForm />

                    
                
                
            </div>
        );
    }

    export default Login;