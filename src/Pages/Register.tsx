import Header from "../components/Header";
import RegisterForm from "../components/Register/RegisterForm";
import Footer from "../components/Footer";
function Register() {

        return (

            //De momento con datos estáticos, luego se conectará a una API para obtener los datos reales
            <div className="min-h-screen text-white">
                <Header />

                <RegisterForm />

                
                        <Footer />
                   
            </div>
        );
    }

    export default Register;