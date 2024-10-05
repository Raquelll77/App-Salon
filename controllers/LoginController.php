<?php

namespace Controllers;

use Model\Usuario;
use MVC\Router;

class LoginController
{
    public static function Login(Router $router)
    {

        $router->render('auth/login');
    }
    public static function logout()
    {
        echo "desde logout";
    }
    public static function olvide(Router $router)
    {
        $router->render('auth/olvide-password');
    }
    public static function recuperar()
    {
        echo "desde recuperar";
    }
    public static function crear(Router $router)
    {
        $usuario = new Usuario();
        $alertas = [];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $usuario->sincronizar($_POST);
            $alertas = $usuario->validarNuevaCuenta();

            //revisar que el arreglo de alertas este vacío
            if (empty($alertas)) {
                //verificar que el usuario no este registrado
                $resultado = $usuario->existeUsuario();
                if ($resultado->num_rows) {
                    $alertas = Usuario::getAlertas();
                } else {
                    //hashear password
                    $usuario->hashPassword();

                    //generar un token unico
                    $usuario->crearToken();

                    debuguear($usuario);
                }
            }
        }
        $router->render('auth/crear-cuenta', [
            'usuario' => $usuario,
            'alertas' => $alertas
        ]);
    }
}
