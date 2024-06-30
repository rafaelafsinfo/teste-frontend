import Link from "next/link";
import styles from '../styles/navbar.css'

const Navbar = () =>{
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link href="/">
                        <p>Home</p> 
                    </Link>
                </li>
                <li>
                    <Link href="/createfuncionario">
                        <p>Adicionar Funcionarios</p> 
                    </Link>
                </li>
                <li>
                    <Link href="/createperfil">
                        <p>Atribuir perfis</p> 
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar