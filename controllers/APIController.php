<?php

namespace Controllers;

use Model\Servicio;

class APIController
{
    public static function index()
    {
        // Establece el encabezado de contenido para JSON con codificación UTF-8
        header('Content-Type: application/json; charset=UTF-8');

        // Obtiene todos los servicios desde el modelo
        $servicios = Servicio::all();

        // Codifica los datos a JSON con la opción de evitar la codificación de caracteres Unicode (\uXXXX)
        echo json_encode($servicios, JSON_UNESCAPED_UNICODE);
    }
}
