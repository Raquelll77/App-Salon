<h1 class="nombre-pagina">Olvide Password</h1>
<p class="descripcion-pagina">Reestable tu password escribiendo tu email a continuación</p>
<form action="/olvide" class="formulario" method="POST">
    <div class="campo">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Tu e-mail">
    </div>
    <input type="submit" class="boton" value="Enviar instrucciones">
</form>
<div class="acciones">
    <a href="/">¿Ya tienes una cuenta? Inicia Sesión</a>
    <a href="/crear-cuenta">¿Aún no tienes una cuenta? Crea una</a>
</div>