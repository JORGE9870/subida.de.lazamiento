<template>
    <div class="countdown-container">
        <!-- Fondo animado -->
        <div class="animated-background">
            <div class="floating-element" v-for="n in 6" :key="n" :style="getRandomPosition()"></div>
        </div>

        <!-- Contenido principal -->
        <div class="main-content">
            <!-- Título Principal -->
            <div class="main-title">
                <div class="crown-container">
                    <img src="@/assets/Captura_de_pantalla_2025-05-07_15-36-41-removebg-preview_1_-removebg-preview.png"
                        alt="Corona" class="crown-image">
                </div>
                <h1>

                    <span class="diamond-left"><img src="@/assets/wmremove-transformed-removebg-preview_1_.png"
                            alt="VIP"></span>
                    <span class="vip-text">VIP SCORTS</span>
                    <span class="diamond-right"><img src="@/assets/wmremove-transformed-removebg-preview_1_.png"
                            alt="VIP"></span>
                </h1>
                <p class="subtitle">COLOMBIA LATINOAMÉRICA Y EL MUNDO</p>
                <p class="subtitle">LA MEJOR EXCLUSIVIDAD PARA TI</p>
            </div>

            <!-- Mensaje de Lanzamiento -->
            <div class="launch-message">
                <div class="launch-icon">
                    <i class="fas fa-rocket"></i>
                </div>
                <h2 class="launch-title">¡LANZAMIENTO!</h2>
                <p class="launch-description">
                    Estamos preparando algo extraordinario para ti. La experiencia VIP más exclusiva está a punto de
                    llegar.
                </p>
            </div>

            <!-- Contador Principal -->
            <div class="countdown-main">
                <div class="countdown-label">
                    <h3>Faltan para el lanzamiento:</h3>
                </div>

                <div class="countdown-display">
                    <div class="time-block">
                        <div class="time-number">{{ timeLeft.days }}</div>
                        <div class="time-label">Días</div>
                    </div>
                    <div class="time-separator">:</div>
                    <div class="time-block">
                        <div class="time-number">{{ timeLeft.hours }}</div>
                        <div class="time-label">Horas</div>
                    </div>
                    <div class="time-separator">:</div>
                    <div class="time-block">
                        <div class="time-number">{{ timeLeft.minutes }}</div>
                        <div class="time-label">Minutos</div>
                    </div>
                    <div class="time-separator">:</div>
                    <div class="time-block">
                        <div class="time-number">{{ timeLeft.seconds }}</div>
                        <div class="time-label">Segundos</div>
                    </div>
                </div>

                <div class="total-hours">
                    <div class="hours-display">
                        <span class="hours-number">{{ totalHoursLeft }}</span>
                        <span class="hours-text">horas restantes</span>
                    </div>
                </div>
            </div>

            <!-- Características VIP -->
            <div class="features-preview">
                <h3 class="features-title">Lo que te espera en VIP Scorts</h3>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-star"></i>
                        </div>
                        <h4>Modelos Premium</h4>
                        <p>Las escorts más exclusivas y sofisticadas</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <h4>100% Verificadas</h4>
                        <p>Perfiles auténticos y verificados</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-lock"></i>
                        </div>
                        <h4>Máxima Discreción</h4>
                        <p>Privacidad y confidencialidad garantizada</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-crown"></i>
                        </div>
                        <h4>Experiencia VIP</h4>
                        <p>Servicios de lujo y atención personalizada</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
    name: 'CountdownView',
    setup() {
        const timeLeft = ref({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        })
        const totalHoursLeft = ref(480)

        // Calcular o recuperar la fecha objetivo del countdown
        let targetDate
        const savedTargetDate = localStorage.getItem('vip-scorts-countdown-target')
        
        if (savedTargetDate) {
            // Si ya existe una fecha guardada, usarla
            targetDate = new Date(savedTargetDate)
        } else {
            // Si no existe, calcular nueva fecha (480 horas desde ahora) y guardarla
            targetDate = new Date()
            targetDate.setHours(targetDate.getHours() + 480)
            localStorage.setItem('vip-scorts-countdown-target', targetDate.toISOString())
        }

        let countdownInterval = null

        // Función para actualizar el contador
        const updateCountdown = () => {
            const now = new Date().getTime()
            const target = targetDate.getTime()
            const difference = target - now

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24))
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
                const seconds = Math.floor((difference % (1000 * 60)) / 1000)

                timeLeft.value = {
                    days: days.toString().padStart(2, '0'),
                    hours: hours.toString().padStart(2, '0'),
                    minutes: minutes.toString().padStart(2, '0'),
                    seconds: seconds.toString().padStart(2, '0')
                }

                // Calcular horas totales restantes
                totalHoursLeft.value = Math.floor(difference / (1000 * 60 * 60))
            } else {
                // El contador ha llegado a cero
                timeLeft.value = { days: '00', hours: '00', minutes: '00', seconds: '00' }
                totalHoursLeft.value = 0
                if (countdownInterval) {
                    clearInterval(countdownInterval)
                }
            }
        }

        // Funciones para elementos animados
        const getRandomPosition = () => {
            return {
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 5 + 's',
                animationDuration: (Math.random() * 10 + 5) + 's'
            }
        }

        onMounted(() => {
            // Actualizar el contador inmediatamente
            updateCountdown()

            // Actualizar cada segundo
            countdownInterval = setInterval(updateCountdown, 1000)
        })

        onUnmounted(() => {
            if (countdownInterval) {
                clearInterval(countdownInterval)
            }
        })

        return {
            timeLeft,
            totalHoursLeft,
            getRandomPosition
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap');

/* Estilos globales responsive */
* {
    box-sizing: border-box;
}

/* Prevenir overflow horizontal */
html, body {
    overflow-x: hidden;
    max-width: 100%;
    margin: 0;
    padding: 0;
}

/* Mejoras para todos los dispositivos */
body {
    font-family: 'Cinzel', serif;
    background: #000;
}

/* Prevenir zoom en inputs en iOS */
input, select, textarea {
    font-size: 16px;
}

/* Smooth scrolling para mejor UX */
html {
    scroll-behavior: smooth;
}

/* Mejoras para touch devices */
@media (hover: none) and (pointer: coarse) {
    .time-block:hover,
    .feature-card:hover,
    .featured-ad:hover {
        transform: none;
    }
    
    .time-block:active,
    .feature-card:active {
        transform: scale(0.98);
    }
}

@media (max-width: 768px) {
    input, select, textarea {
        font-size: 16px;
    }
    
    /* Mejorar el tap target size para móviles */
    .time-block {
        min-height: 44px;
    }
}

.countdown-container {
    min-height: 100vh;
    position: relative;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%);
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
}

.countdown-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
        radial-gradient(circle at 20% 20%, rgba(255, 31, 143, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(0, 240, 255, 0.1) 0%, transparent 50%);
    animation: gradientMove 15s ease infinite;
    z-index: 0;
    pointer-events: none;
}

@keyframes gradientMove {
    0% {
        transform: scale(1) rotate(0deg);
    }

    50% {
        transform: scale(1.2) rotate(180deg);
    }

    100% {
        transform: scale(1) rotate(360deg);
    }
}

.animated-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
}

.floating-element {
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(255, 31, 143, 0.6);
    border-radius: 50%;
    animation: float 8s ease-in-out infinite;
    box-shadow: 0 0 20px rgba(255, 31, 143, 0.8);
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0px) translateX(0px);
    }

    25% {
        transform: translateY(-20px) translateX(10px);
    }

    50% {
        transform: translateY(0px) translateX(-10px);
    }

    75% {
        transform: translateY(20px) translateX(5px);
    }
}

.main-content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 2rem;
    max-width: 1200px;
    width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
}

.main-title {
    margin-bottom: 4rem;
}

.main-title h1 {
    font-size: 4rem;
    font-weight: 700;
    letter-spacing: 4px;
    margin-bottom: 0.5rem;
    font-family: 'Cinzel', serif;
    background: linear-gradient(45deg, #ff1f8f, #00f0ff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 20px rgba(255, 31, 143, 0.5);
    animation: neonPulse 1.5s ease-in-out infinite alternate;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
}

.logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: all 0.3s ease;
}

.logo-img {
    width: 30rem;
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 0 15px rgba(255, 31, 143, 0.8));
    transition: all 0.3s ease;
    animation: logoGlow 2s ease-in-out infinite alternate;
}

.logo-img:hover {
    transform: scale(1.1);
    filter: drop-shadow(0 0 20px rgba(255, 31, 143, 1));
}

@keyframes logoGlow {
    0% {
        filter: drop-shadow(0 0 10px rgba(255, 31, 143, 0.6));
        transform: scale(1);
    }

    100% {
        filter: drop-shadow(0 0 20px rgba(255, 31, 143, 0.9));
        transform: scale(1.05);
    }
}

@keyframes neonPulse {
    from {
        text-shadow: 0 0 10px rgba(255, 31, 143, 0.5),
            0 0 20px rgba(255, 31, 143, 0.5),
            0 0 30px rgba(255, 31, 143, 0.5);
    }

    to {
        text-shadow: 0 0 20px rgba(255, 31, 143, 0.8),
            0 0 40px rgba(255, 31, 143, 0.8),
            0 0 60px rgba(255, 31, 143, 0.8);
    }
}

.subtitle {
    font-size: 1rem;
    letter-spacing: 3px;
    color: #fff;
    text-shadow: 0 0 10px rgba(255, 31, 143, 0.5);
    margin-bottom: 0.5rem;
}

.launch-message {
    background: rgba(30, 30, 35, 0.8);
    backdrop-filter: blur(15px);
    padding: 2rem;
    border-radius: 20px;
    border: 2px solid rgba(255, 31, 143, 0.3);
    margin-bottom: 3rem;
    box-shadow: 0 0 40px rgba(255, 31, 143, 0.2);
}

.launch-icon {
    margin-bottom: 1rem;
}

.launch-icon i {
    font-size: 3rem;
    color: #ff1f8f;
    animation: rocketSpin 3s linear infinite;
}

@keyframes rocketSpin {
    0% {
        transform: rotate(0deg) scale(1);
    }

    25% {
        transform: rotate(90deg) scale(1.1);
    }

    50% {
        transform: rotate(180deg) scale(1);
    }

    75% {
        transform: rotate(270deg) scale(1.1);
    }

    100% {
        transform: rotate(360deg) scale(1);
    }
}

.launch-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 1rem;
    text-shadow: 0 0 20px rgba(255, 31, 143, 0.6);
}

.launch-description {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
}

.countdown-main {
    background: rgba(30, 30, 35, 0.9);
    backdrop-filter: blur(20px);
    padding: 3rem;
    border-radius: 25px;
    border: 3px solid rgba(255, 31, 143, 0.5);
    margin-bottom: 3rem;
    box-shadow: 0 0 60px rgba(255, 31, 143, 0.3);
    animation: containerPulse 3s ease-in-out infinite;
}

@keyframes containerPulse {

    0%,
    100% {
        box-shadow: 0 0 60px rgba(255, 31, 143, 0.3);
        border-color: rgba(255, 31, 143, 0.5);
    }

    50% {
        box-shadow: 0 0 80px rgba(255, 31, 143, 0.5);
        border-color: rgba(255, 31, 143, 0.8);
    }
}

.countdown-label h3 {
    font-size: 1.8rem;
    color: #fff;
    margin-bottom: 2rem;
    text-shadow: 0 0 15px rgba(255, 31, 143, 0.5);
}

.countdown-display {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
}

.time-block {
    background: linear-gradient(145deg, rgba(255, 31, 143, 0.2), rgba(0, 240, 255, 0.2));
    border: 2px solid rgba(255, 31, 143, 0.5);
    border-radius: 15px;
    padding: 1.5rem 1rem;
    min-width: 120px;
    backdrop-filter: blur(10px);
    transition: transform 0.3s ease;
}

.time-block:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(255, 31, 143, 0.4);
}

.time-number {
    font-size: 3rem;
    font-weight: 700;
    color: #fff;
    text-shadow: 0 0 20px rgba(255, 31, 143, 0.8);
    font-family: 'Cinzel', serif;
    animation: numberGlow 2s ease-in-out infinite alternate;
}

@keyframes numberGlow {
    from {
        text-shadow: 0 0 10px rgba(255, 31, 143, 0.5);
    }

    to {
        text-shadow: 0 0 25px rgba(255, 31, 143, 1);
    }
}

.time-label {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.8);
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-top: 0.5rem;
}

.time-separator {
    font-size: 2.5rem;
    color: #00f0ff;
    font-weight: 700;
    text-shadow: 0 0 15px rgba(0, 240, 255, 0.8);
    animation: separatorBlink 1s ease-in-out infinite;
}

@keyframes separatorBlink {

    0%,
    50% {
        opacity: 1;
    }

    51%,
    100% {
        opacity: 0.3;
    }
}

.total-hours {
    text-align: center;
    padding: 1.5rem;
    background: rgba(255, 31, 143, 0.1);
    border-radius: 15px;
    border: 1px solid rgba(255, 31, 143, 0.3);
}

.hours-display {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}

.hours-number {
    font-size: 2.5rem;
    font-weight: 700;
    color: #ff1f8f;
    text-shadow: 0 0 20px rgba(255, 31, 143, 0.8);
}

.hours-text {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.9);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.features-preview {
    margin-bottom: 3rem;
}

.features-title {
    font-size: 2rem;
    color: #fff;
    margin-bottom: 2rem;
    text-shadow: 0 0 15px rgba(255, 31, 143, 0.5);
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    max-width: 1000px;
    margin: 0 auto;
}

.feature-card {
    background: rgba(30, 30, 35, 0.6);
    backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 15px;
    border: 1px solid rgba(255, 31, 143, 0.2);
    transition: all 0.3s ease;
    text-align: center;
}

.feature-card:hover {
    transform: translateY(-10px);
    border-color: rgba(255, 31, 143, 0.5);
    box-shadow: 0 20px 40px rgba(255, 31, 143, 0.2);
}

.feature-icon {
    margin-bottom: 1rem;
}

.feature-icon i {
    font-size: 2.5rem;
    color: #ff1f8f;
    text-shadow: 0 0 15px rgba(255, 31, 143, 0.6);
}

.feature-card h4 {
    font-size: 1.3rem;
    color: #fff;
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.feature-card p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.95rem;
    line-height: 1.5;
}

/* Responsive Design */

/* Pantallas ultra-anchas (monitores grandes) */
@media (min-width: 1400px) {
    .main-content {
        max-width: 1400px;
    }
    
    .main-title h1 {
        font-size: 5rem;
        letter-spacing: 5px;
    }
    
    .launch-title {
        font-size: 3rem;
    }
    
    .countdown-main {
        padding: 4rem;
    }
    
    .time-number {
        font-size: 3.5rem;
    }
    
    .hours-number {
        font-size: 3rem;
    }
    
    .features-grid {
        grid-template-columns: repeat(4, 1fr);
        max-width: 1300px;
    }
}

/* Escritorio estándar */
@media (min-width: 1200px) and (max-width: 1399px) {
    .main-title h1 {
        font-size: 4.5rem;
    }
    
    .features-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* Tablets grandes */
@media (max-width: 1024px) {
    .main-title h1 {
        font-size: 3.5rem;
        letter-spacing: 3px;
    }

    .countdown-main {
        padding: 2.5rem 2rem;
    }

    .launch-title {
        font-size: 2.2rem;
    }

    .features-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
    }

    .time-block {
        min-width: 110px;
        padding: 1.3rem 0.8rem;
    }

    .time-number {
        font-size: 2.5rem;
    }
}

/* Tablets */
@media (max-width: 768px) {
    .main-title h1 {
        font-size: 2.8rem;
        flex-direction: column;
        gap: 1rem;
        letter-spacing: 2px;
    }

    .diamond-left img,
    .diamond-right img {
        width: 30px;
        height: 30px;
    }

    .subtitle {
        font-size: 0.9rem;
        letter-spacing: 2px;
    }

    .launch-message {
        padding: 1.5rem;
        margin-bottom: 2rem;
    }

    .launch-title {
        font-size: 2rem;
    }

    .launch-description {
        font-size: 1rem;
    }

    .countdown-display {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0.8rem;
        justify-content: center;
    }

    .time-block {
        min-width: 100px;
        padding: 1.2rem 0.8rem;
        flex: 1;
        max-width: 120px;
    }

    .time-number {
        font-size: 2.2rem;
    }

    .time-separator {
        font-size: 2rem;
        display: none; /* Ocultar separadores en móvil para mejor diseño */
    }

    .countdown-main {
        padding: 2rem 1.5rem;
        margin-bottom: 2rem;
    }

    .countdown-label h3 {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
    }

    .features-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    .feature-card {
        padding: 1.8rem;
    }

    .main-content {
        padding: 1rem;
    }

    .hours-number {
        font-size: 2rem;
    }

    .hours-text {
        font-size: 1rem;
    }
}

/* Móviles grandes */
@media (max-width: 600px) {
    .main-title h1 {
        font-size: 2.2rem;
        gap: 0.8rem;
    }

    .diamond-left img,
    .diamond-right img {
        width: 25px;
        height: 25px;
    }

    .launch-icon i {
        font-size: 2.5rem;
    }

    .launch-title {
        font-size: 1.8rem;
    }

    .launch-description {
        font-size: 0.95rem;
    }

    .countdown-display {
        gap: 0.6rem;
    }

    .time-block {
        min-width: 80px;
        padding: 1rem 0.6rem;
        max-width: 100px;
    }

    .time-number {
        font-size: 1.8rem;
    }

    .time-label {
        font-size: 0.8rem;
        letter-spacing: 1px;
    }

    .countdown-label h3 {
        font-size: 1.3rem;
    }

    .hours-number {
        font-size: 1.8rem;
    }

    .hours-text {
        font-size: 0.95rem;
    }

    .feature-card {
        padding: 1.5rem;
    }

    .feature-card i {
        font-size: 2rem;
    }

    .feature-card h4 {
        font-size: 1.1rem;
    }

    .feature-card p {
        font-size: 0.9rem;
    }
}

/* Móviles pequeños */
@media (max-width: 480px) {
    .countdown-container {
        padding: 1rem 0;
    }

    .main-title {
        margin-bottom: 2rem;
    }

    .main-title h1 {
        font-size: 1.8rem;
        gap: 0.5rem;
        line-height: 1.2;
    }

    .vip-text {
        display: block;
        margin: 0.5rem 0;
    }

    .diamond-left,
    .diamond-right {
        display: none; /* Ocultar diamantes en pantallas muy pequeñas */
    }

    .subtitle {
        font-size: 0.8rem;
        letter-spacing: 1px;
        line-height: 1.4;
    }

    .launch-message {
        padding: 1.2rem;
        margin-bottom: 1.5rem;
    }

    .launch-title {
        font-size: 1.6rem;
        line-height: 1.2;
    }

    .launch-description {
        font-size: 0.9rem;
        line-height: 1.5;
    }

    .countdown-main {
        padding: 1.5rem 1rem;
    }

    .countdown-display {
        flex-direction: column;
        gap: 0.8rem;
    }

    .time-block {
        min-width: 120px;
        max-width: 150px;
        padding: 1rem;
        margin: 0 auto;
    }

    .time-number {
        font-size: 1.6rem;
    }

    .time-label {
        font-size: 0.75rem;
    }

    .countdown-label h3 {
        font-size: 1.1rem;
        margin-bottom: 1rem;
        line-height: 1.3;
    }

    .total-hours {
        padding: 1rem;
    }

    .hours-display {
        flex-direction: column;
        gap: 0.5rem;
    }

    .hours-number {
        font-size: 1.5rem;
    }

    .hours-text {
        font-size: 0.9rem;
    }

    .features-title {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
    }

    .feature-card {
        padding: 1.2rem;
    }

    .feature-card i {
        font-size: 1.8rem;
    }

    .feature-card h4 {
        font-size: 1rem;
    }

    .feature-card p {
        font-size: 0.85rem;
        line-height: 1.4;
    }

    .main-content {
        padding: 0.5rem;
    }
}

/* Móviles muy pequeños */
@media (max-width: 360px) {
    .main-title h1 {
        font-size: 1.5rem;
    }

    .launch-title {
        font-size: 1.4rem;
    }

    .countdown-label h3 {
        font-size: 1rem;
    }

    .time-block {
        min-width: 100px;
        max-width: 120px;
        padding: 0.8rem;
    }

    .time-number {
        font-size: 1.4rem;
    }

    .time-label {
        font-size: 0.7rem;
    }

    .hours-number {
        font-size: 1.3rem;
    }

    .hours-text {
        font-size: 0.8rem;
    }

    .features-title {
        font-size: 1.3rem;
    }

    .feature-card {
        padding: 1rem;
    }

    .feature-card i {
        font-size: 1.6rem;
    }

    .feature-card h4 {
        font-size: 0.95rem;
    }

    .feature-card p {
        font-size: 0.8rem;
    }
}

/* Pantallas de alta densidad (Retina, etc.) */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .time-number,
    .hours-number,
    .main-title h1 {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    
    .countdown-container::before {
        will-change: transform;
    }
    
    .floating-element {
        will-change: transform;
    }
}

/* Preferencias de movimiento reducido */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    
    .countdown-container::before,
    .floating-element {
        animation: none !important;
    }
}

/* Modo landscape en móviles */
@media screen and (max-width: 768px) and (orientation: landscape) {
    .main-title {
        margin-bottom: 2rem;
    }
    
    .main-title h1 {
        font-size: 2rem;
    }
    
    .countdown-main {
        padding: 1.5rem;
    }
    
    .countdown-display {
        flex-direction: row;
        gap: 0.5rem;
    }
    
    .time-block {
        min-width: 70px;
        padding: 0.8rem 0.4rem;
    }
    
    .time-number {
        font-size: 1.4rem;
    }
    
    .features-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }
    
    .feature-card {
        padding: 1rem;
    }
}
</style>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap');

.home {
    min-height: 100vh;
    padding-top: 0;
    display: flex;
    flex-direction: column;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%);
    position: relative;
    overflow: hidden;
    margin-top: -64px;
}

.home::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
        radial-gradient(circle at 20% 20%, rgba(255, 31, 143, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(0, 240, 255, 0.1) 0%, transparent 50%);
    animation: gradientMove 15s ease infinite;
    z-index: 0;
    pointer-events: none;
}

@keyframes gradientMove {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.2);
    }

    100% {
        transform: scale(1);
    }
}

.main-title,
.search-container,
.live-card,
.ranking-card,
.featured-ad,
.ad-info,
.trend-card,
.trend-content,
.feature-card {
    background: none !important;
    backdrop-filter: none !important;
}

.main-title {
    position: relative;
    z-index: 1;
    text-align: center;
    margin: 5rem 0 2rem 0;
}

.main-title h1 {
    font-size: 4rem;
    font-weight: 700;
    letter-spacing: 4px;
    margin-bottom: 0.5rem;
    font-family: 'Cinzel', serif;
    background: linear-gradient(45deg, #ff1f8f, #00f0ff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 20px rgba(255, 31, 143, 0.5);
    animation: neonPulse 1.5s ease-in-out infinite alternate;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
}

.vip-text {
    background: linear-gradient(45deg, #ff1f8f, #00f0ff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 20px #ff1f8f, 0 0 40px #00f0ff;
    animation: neonPulse 1.5s ease-in-out infinite alternate;
}

.diamond-left,
.diamond-right {
    display: flex;
    align-items: center;
}

.diamond-left img,
.diamond-right img {
    width: 40px;
    height: 40px;
    object-fit: contain;
    filter: drop-shadow(0 0 8px #00f0ff);
    animation: diamondGlow 2s infinite alternate;
}

@keyframes diamondGlow {
    0% {
        filter: drop-shadow(0 0 8px #00f0ff);
    }

    100% {
        filter: drop-shadow(0 0 15px #00f0ff);
    }
}

@keyframes neonPulse {
    from {
        text-shadow: 0 0 10px rgba(255, 31, 143, 0.5),
            0 0 20px rgba(255, 31, 143, 0.5),
            0 0 30px rgba(255, 31, 143, 0.5);
    }

    to {
        text-shadow: 0 0 20px rgba(255, 31, 143, 0.8),
            0 0 40px rgba(255, 31, 143, 0.8),
            0 0 60px rgba(255, 31, 143, 0.8);
    }
}

.subtitle {
    font-size: 1rem;
    letter-spacing: 3px;
    color: #fff;
    text-shadow: 0 0 10px rgba(255, 31, 143, 0.5);
}

.search-container {
    display: flex;
    gap: 1rem;
    max-width: 1200px;
    margin: 2rem auto 0;
    background: rgba(30, 30, 35, 0.6);
    backdrop-filter: blur(10px);
    padding: 2rem 4rem;
    border-radius: 15px;
    border: 2px solid rgba(255, 31, 143, 0.5);
    box-shadow: 0 0 20px rgba(255, 31, 143, 0.3),
        0 0 40px rgba(255, 31, 143, 0.2),
        0 0 60px rgba(255, 31, 143, 0.1);
    animation: containerGlow 2s ease-in-out infinite alternate;
}

@keyframes containerGlow {
    from {
        box-shadow: 0 0 20px rgba(255, 31, 143, 0.3),
            0 0 40px rgba(255, 31, 143, 0.2),
            0 0 60px rgba(255, 31, 143, 0.1);
    }

    to {
        box-shadow: 0 0 30px rgba(255, 31, 143, 0.5),
            0 0 60px rgba(255, 31, 143, 0.3),
            0 0 90px rgba(255, 31, 143, 0.2);
    }
}

.search-box {
    flex: 1;
    position: relative;
}

.search-box i {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #ff1f8f;
    text-shadow: 0 0 10px rgba(255, 31, 143, 0.5);
}

.search-input,
.search-select {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    border: 1px solid rgba(255, 31, 143, 0.5);
    border-radius: 8px;
    background: rgba(30, 30, 35, 0.8);
    color: white;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    font-family: 'Quicksand', sans-serif;
    box-shadow: 0 0 10px rgba(255, 31, 143, 0.2);
}

.search-input:focus,
.search-select:focus {
    outline: none;
    border-color: #ff1f8f;
    box-shadow: 0 0 15px rgba(255, 31, 143, 0.4),
        0 0 30px rgba(255, 31, 143, 0.2);
}

.search-input::placeholder {
    color: rgba(255, 255, 255, 0.5);
}

.search-btn {
    padding: 0 2rem;
    border: none;
    border-radius: 8px;
    background: linear-gradient(45deg, #ff1f8f, #ff4f9f);
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;
    overflow: hidden;
}

.search-btn::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #ff1f8f, #00f0ff, #ff1f8f);
    border-radius: 8px;
    z-index: -1;
    animation: borderGlow 3s linear infinite;
}

.search-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(255, 31, 143, 0.4);
}

.main-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
}

.featured-ad {
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    border: 1px solid rgba(255, 31, 143, 0.2);
    transition: all 0.3s ease;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}

.featured-ad:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 30px rgba(255, 31, 143, 0.3);
    border-color: rgba(255, 31, 143, 0.5);
}

.ad-image {
    position: relative;
    aspect-ratio: 3/4;
}

.ad-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.featured-ad:hover .ad-image img {
    transform: scale(1.05);
}

.ad-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1.5rem;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
    color: white;
}

.ad-info h2 {
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    text-align: center;
    line-height: 1.2;
}

.ad-info p {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 0.3rem;
    text-align: center;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.ad-badges {
    display: flex;
    justify-content: center;
    gap: 0.25rem;
    margin: 0.4rem 0 0.6rem 0;
    flex-wrap: wrap;
}

.ad-meta {
    display: flex;
    gap: 0.8rem;
    margin: 0.6rem 0;
    flex-wrap: wrap;
    justify-content: center;
}

.ad-buttons {
    display: flex;
    gap: 0.6rem;
    margin-top: 1rem;
    justify-content: center;
}

.ad-btn {
    flex: 1;
    padding: 0.8rem 1.2rem;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    min-width: 120px;
}

.contact-btn {
    background: linear-gradient(135deg, #ff1f8f, #ff6b35);
    color: white;
    box-shadow: 0 4px 15px rgba(255, 31, 143, 0.3);
}

.contact-btn:hover {
    background: linear-gradient(135deg, #e01a7a, #e55a2b);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 31, 143, 0.4);
}

.whatsapp-btn {
    background: linear-gradient(135deg, #7928ca, #8a2be2);
    color: white;
    box-shadow: 0 4px 15px rgba(121, 40, 202, 0.3);
}

.whatsapp-btn:hover {
    background: linear-gradient(135deg, #6a1b9a, #7b1fa2);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(121, 40, 202, 0.4);
}

.vip-badge-container {
    display: flex;
    justify-content: center;
    margin-bottom: 0.8rem;
}

.vip-modelo {
    background: linear-gradient(135deg, #ff1f8f, #ff6b35);
    color: white;
    padding: 0.4rem 0.8rem;
    border-radius: 2rem;
    font-size: 0.75rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    box-shadow: 0 0 15px rgba(255, 31, 143, 0.4);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.ad-buttons {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.8rem;
}

.ad-btn {
    flex: 1;
    padding: 0.6rem 1rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
}

.contact-btn {
    background: linear-gradient(135deg, #ff1f8f, #ff6b35);
    color: white;
}

.contact-btn:hover {
    background: linear-gradient(135deg, #e01a7a, #e55a2b);
    transform: translateY(-2px);
}

.whatsapp-btn {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.whatsapp-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
}

.trends-section,
.live-section,
.top-ranking-section,
.hero-section {
    background: none;
    backdrop-filter: none;
}

.section-title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: #fff;
    letter-spacing: 2px;
    text-shadow: 0 0 15px rgba(255, 31, 143, 0.6);
}

.section-description {
    text-align: center;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 3rem;
    font-size: 1rem;
    letter-spacing: 1px;
}

.trends-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
}

.featured-ad {
    position: relative;
    overflow: hidden;
    border-radius: 25px;
    border: 1px solid rgba(255, 31, 143, 0.2);
    transition: all 0.3s ease;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
}

.featured-ad:hover {
    transform: translateY(-8px);
    box-shadow: 0 0 40px rgba(255, 31, 143, 0.3);
    border-color: rgba(255, 31, 143, 0.5);
}

.ad-image {
    position: relative;
    aspect-ratio: 3/4;
    height: 320px;
}

.ad-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.featured-ad:hover .ad-image img {
    transform: scale(1.03);
}

.ad-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 3.5rem;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
    color: white;
}

.ad-badges {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
}

.ad-info h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-align: center;
    line-height: 1.2;
}

.ad-info p {
    font-size: 1.4rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 0.3rem;
    text-align: center;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.ad-meta {
    display: flex;
    gap: 1.5rem;
    margin: 1rem 0 1.5rem 0;
    flex-wrap: wrap;
    justify-content: center;
}

.ad-meta .location,
.ad-meta .views {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.8);
    background: rgba(255, 255, 255, 0.1);
    padding: 0.6rem 1.2rem;
    border-radius: 25px;
    backdrop-filter: blur(10px);
}

.vip-badge-container {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
}

.vip-modelo {
    background: linear-gradient(135deg, #ff1f8f, #ff6b35);
    color: white;
    padding: 1rem 2rem;
    border-radius: 2rem;
    font-size: 1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    box-shadow: 0 0 30px rgba(255, 31, 143, 0.4);
    text-transform: uppercase;
    letter-spacing: 2px;
}

.ad-buttons {
    display: flex;
    gap: 1.5rem;
    margin-top: 2rem;
}

.ad-btn {
    flex: 1;
    padding: 1.5rem 2rem;
    border: none;
    border-radius: 18px;
    font-weight: 600;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
}

.contact-btn {
    background: linear-gradient(135deg, #ff1f8f, #ff6b35);
    color: white;
}

.contact-btn:hover {
    background: linear-gradient(135deg, #e01a7a, #e55a2b);
    transform: translateY(-2px);
}

.whatsapp-btn {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.whatsapp-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
}

@keyframes borderGlow {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

.live-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto 4rem;
}

.live-card {
    background: rgba(30, 30, 35, 0.8);
    border-radius: 15px;
    overflow: hidden;
    border: 1px solid rgba(255, 31, 143, 0.2);
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.live-card:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 31, 143, 0.5);
    box-shadow: 0 0 30px rgba(255, 31, 143, 0.2);
}

.live-thumbnail {
    position: relative;
    aspect-ratio: 16/9;
}

.live-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.live-overlay {
    position: absolute;
    top: 1rem;
    left: 1rem;
    right: 1rem;
    display: flex;
    justify-content: space-between;
}

.live-indicator {
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: #ff0000;
    border-radius: 50%;
    margin-right: 5px;
    animation: redPulse 1.5s infinite;
    box-shadow: 0 0 8px rgba(255, 0, 0, 0.8);
}

@keyframes redPulse {
    0% {
        box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.9);
        opacity: 1;
    }

    50% {
        opacity: 0.6;
    }

    100% {
        box-shadow: 0 0 0 6px rgba(255, 0, 0, 0);
        opacity: 1;
    }
}

.live-info {
    padding: 1.5rem;
}

.streamer-profile {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.streamer-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid #ff1f8f;
}

.streamer-details h3 {
    color: white;
    font-size: 1.1rem;
    margin-bottom: 0.2rem;
}

.streamer-details p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
}

.join-stream-btn {
    width: 100%;
    padding: 1rem;
    border: none;
    border-radius: 8px;
    background: linear-gradient(45deg, #ff1f8f, #ff4f9f);
    color: white;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.join-stream-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(255, 31, 143, 0.4);
}

.live-features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.feature-card {
    text-align: center;
    padding: 2rem;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 15px;
    border: 1px solid rgba(255, 31, 143, 0.2);
    transition: all 0.3s ease;
}

.feature-card:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 31, 143, 0.5);
}

.feature-card i {
    font-size: 2.5rem;
    color: #ff1f8f;
    margin-bottom: 1rem;
    text-shadow: 0 0 20px rgba(255, 31, 143, 0.5);
}

.feature-card h3 {
    color: white;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
}

.feature-card p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
}

@keyframes pulse {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
}

@media (max-width: 1024px) {
    .trends-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .trends-grid {
        grid-template-columns: 1fr;
    }

    .main-title h1 {
        font-size: 2rem;
    }

    .search-container {
        flex-direction: column;
        padding: 1.5rem;
        max-width: 95%;
    }

    .search-btn {
        width: 100%;
        justify-content: center;
        padding: 1rem;
    }

    .live-grid {
        grid-template-columns: 1fr;
    }

    .live-features {
        grid-template-columns: 1fr;
    }
}

.hero-section {
    background: linear-gradient(to bottom, rgba(10, 10, 10, 0.8), rgba(20, 20, 20, 0.9)),
        linear-gradient(135deg, rgba(20, 0, 30, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%);
    padding: 4rem 0;
    margin-top: 4rem;
}

.hero-title {
    font-size: 2.5rem;
    font-weight: 700;
    letter-spacing: 4px;
    margin-bottom: 0.5rem;
    font-family: 'Orbitron', sans-serif;
    background: linear-gradient(45deg, #ff1f8f, #00f0ff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 20px rgba(255, 31, 143, 0.5);
    animation: neonPulse 1.5s ease-in-out infinite alternate;
}

@keyframes neonPulse {
    from {
        text-shadow: 0 0 10px rgba(255, 31, 143, 0.5),
            0 0 20px rgba(255, 31, 143, 0.5),
            0 0 30px rgba(255, 31, 143, 0.5);
    }

    to {
        text-shadow: 0 0 20px rgba(255, 31, 143, 0.8),
            0 0 40px rgba(255, 31, 143, 0.8),
            0 0 60px rgba(255, 31, 143, 0.8);
    }
}

.hero-subtitle {
    font-size: 1rem;
    letter-spacing: 3px;
    color: #fff;
    text-shadow: 0 0 10px rgba(255, 31, 143, 0.5);
}

.hero-buttons {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
}

.cta-button,
.model-button {
    padding: 1rem 2rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.cta-button {
    background: linear-gradient(45deg, #ff1f8f, #ff4f9f);
    color: white;
}

.model-button {
    background: rgba(255, 255, 255, 0.1);
    color: white;
}

.auth-prompt {
    text-align: center;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
}

.auth-prompt a {
    color: #ff1f8f;
    text-decoration: none;
}

.footer {
    /* background-color: none; */
    /* backdrop-filter: none; */
    color: #fff;
    padding: 4rem 0 2rem;
    margin-top: 3rem;
}

.footer-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

.footer-section h3 {
    color: #ff1f8f;
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    letter-spacing: 1px;
    font-weight: 600;
    text-shadow: 0 0 10px rgba(255, 31, 143, 0.3);
}

.footer-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.footer-section ul li {
    margin-bottom: 0.8rem;
}

.footer-section ul li a {
    color: #888;
    text-decoration: none;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
}

.footer-section ul li a:hover {
    color: #ff1f8f;
    transform: translateX(5px);
}

.footer-bottom {
    max-width: 1200px;
    margin: 3rem auto 0;
    padding: 2rem 2rem 0;
    border-top: 1px solid rgba(255, 31, 143, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.footer-info p {
    color: #888;
    font-size: 0.9rem;
    margin: 0.3rem 0;
}

.footer-social {
    display: flex;
    gap: 1rem;
}

.social-link {
    color: #888;
    font-size: 1.2rem;
    transition: all 0.3s ease;
}

.social-link:hover {
    color: #ff1f8f;
    transform: translateY(-3px);
}

@media (max-width: 1024px) {
    .footer-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .footer-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .footer-bottom {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
    }

    .footer-social {
        justify-content: center;
    }
}

.live-badge {
    background: rgba(255, 0, 0, 0.8);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-size: 0.8rem;
    font-weight: 600;
    display: flex;
    align-items: center;
}

.viewers-count {
    background: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

/* Estilos para el overlay de autenticación */
.auth-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.auth-message {
    background: linear-gradient(135deg, #1a0a20 0%, #3d0a4f 100%);
    border: 2px solid #ff1f8f;
    border-radius: 15px;
    padding: 30px;
    text-align: center;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 0 30px rgba(255, 31, 143, 0.5);
}

.auth-message i {
    font-size: 3rem;
    color: #ff1f8f;
    margin-bottom: 15px;
}

.auth-message h2 {
    color: #fff;
    font-size: 1.8rem;
    margin-bottom: 15px;
    text-shadow: 0 0 10px rgba(255, 31, 143, 0.5);
}

.auth-message p {
    color: #ccc;
    margin-bottom: 25px;
    font-size: 1.1rem;
}

.auth-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
}

.auth-button {
    background: linear-gradient(90deg, #ff1f8f 0%, #ff4f9f 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
    border: none;
    border-radius: 30px;
    padding: 12px 40px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    transform: scale(1);
    text-decoration: none;
}

.auth-button:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(255, 31, 143, 0.8);
}

.auth-button-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 30px;
    padding: 12px 40px;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;
}

.auth-button-secondary:hover {
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
}

@media (max-width: 480px) {
    .auth-message {
        width: 95%;
        padding: 20px;
    }

    .auth-message h2 {
        font-size: 1.5rem;
    }

    .auth-buttons {
        flex-direction: column;
        width: 100%;
    }

    .auth-button,
    .auth-button-secondary {
        width: 100%;
        padding: 12px 20px;
        text-align: center;
    }
}

/* Estilos para el modal promocional */
.promo-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(8px);
    z-index: 1100;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeIn 0.5s ease-out;
}

.promo-content {
    background: linear-gradient(135deg, #1a0a20 0%, #3d0a4f 100%);
    border: 2px solid #ff1f8f;
    border-radius: 15px;
    width: 90%;
    max-width: 500px;
    padding: 30px;
    position: relative;
    box-shadow: 0 0 40px rgba(255, 31, 143, 0.6);
    transform: scale(1);
    transition: transform 0.3s ease;
    animation: scaleIn 0.5s ease-out;
}

.close-promo {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    color: #fff;
    font-size: 1.8rem;
    cursor: pointer;
    transition: all 0.3s;
}

.close-promo:hover {
    color: #ff1f8f;
    transform: scale(1.2);
}

.promo-header {
    text-align: center;
    margin-bottom: 25px;
}

.promo-icon {
    color: #ffd700;
    font-size: 3rem;
    margin-bottom: 15px;
    filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.7));
}

.promo-header h2 {
    color: #fff;
    font-size: 1.8rem;
    text-shadow: 0 0 10px rgba(255, 31, 143, 0.7);
    letter-spacing: 1px;
}

.promo-body {
    margin-bottom: 25px;
}

.promo-text {
    color: #fff;
    font-size: 1.1rem;
    margin-bottom: 15px;
    text-align: center;
}

.promo-list {
    list-style: none;
    padding: 0;
    margin: 0 0 20px 0;
}

.promo-list li {
    color: #ccc;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
}

.promo-list li i {
    color: #ff1f8f;
    margin-right: 10px;
}

.promo-highlight {
    background: linear-gradient(90deg, #ff1f8f 0%, #ff6a8e 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
    font-size: 1.1rem;
    text-align: center;
    margin-top: 20px;
    padding: 0 10px;
}

.promo-button {
    background: linear-gradient(90deg, #ff1f8f 0%, #ff4f9f 100%);
    color: #fff;
    border: none;
    border-radius: 30px;
    padding: 15px 30px;
    font-size: 1.1rem;
    font-weight: 700;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    box-shadow: 0 0 20px rgba(255, 31, 143, 0.5);
    cursor: pointer;
    transition: all 0.3s ease;
}

.promo-button:hover {
    background: linear-gradient(90deg, #ff4f9f 0%, #ff1f8f 100%);
    box-shadow: 0 0 30px rgba(255, 31, 143, 0.8);
    transform: translateY(-3px);
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes scaleIn {
    from {
        transform: scale(0.9);
        opacity: 0;
    }

    to {
        transform: scale(1);
        opacity: 1;
    }
}

.crown-container {
    position: relative;
    display: flex;
    justify-content: center;
    margin-bottom: -20px;
    margin-left: -430px;
}

.crown-image {
    width: 110px;
    height: auto;
    filter: drop-shadow(0 0 3px rgba(255, 215, 0, 0.5));
    z-index: 2;
    transform: rotate(-20deg);
    animation: none;
}

.ranking-badges {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin: 0.5rem 0;
    flex-wrap: wrap;
}

.badge {
    padding: 0.2rem 0.5rem;
    border-radius: 3px;
    font-size: 0.6rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.2rem;
}

.badge.vip {
    background: #ff1f8f;
    color: white;
}

.badge.verified {
    background: #2ed573;
    color: white;
}

.badge.tipo {
    background: #7928ca;
    color: white;
}

/* Estilos para la sección Top Ranking */
.top-ranking-section {
    padding: 6rem 2rem;
    background: rgba(20, 20, 20, 0.4);
}

.top-ranking-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
}

.ranking-card {
    position: relative;
    border-radius: 15px;
    overflow: hidden;
    background: rgba(30, 30, 35, 0.8);
    border: 1px solid rgba(255, 31, 143, 0.2);
    transition: all 0.3s ease;
    aspect-ratio: 2/3;
}

.ranking-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 30px rgba(255, 31, 143, 0.3);
}

.ranking-number {
    position: absolute;
    top: 1rem;
    left: 1rem;
    width: 40px;
    height: 40px;
    background: linear-gradient(45deg, #ff1f8f, #ff4f9f);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 1.2rem;
    z-index: 2;
    box-shadow: 0 0 15px rgba(255, 31, 143, 0.5);
}

.top-1 .ranking-number {
    background: linear-gradient(45deg, #ffd700, #ffa500);
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
}

.top-2 .ranking-number {
    background: linear-gradient(45deg, #c0c0c0, #a9a9a9);
    box-shadow: 0 0 20px rgba(192, 192, 192, 0.6);
}

.top-3 .ranking-number {
    background: linear-gradient(45deg, #cd7f32, #8b4513);
    box-shadow: 0 0 20px rgba(205, 127, 50, 0.6);
}

.ranking-image {
    position: relative;
    width: 100%;
    height: 100%;
}

.ranking-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.ranking-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.ranking-card:hover .ranking-overlay {
    opacity: 1;
}

.ranking-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1.5rem;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
    color: white;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.ranking-info h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.3rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    background: linear-gradient(45deg, #ff1f8f, #ff4f9f);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
}

.ranking-info p {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 0.3rem;
    line-height: 1.4;
    text-align: center;
}

.ranking-stats {
    display: flex;
    gap: 0.5rem;
    margin: 0.3rem 0;
    flex-wrap: wrap;
    justify-content: center;
}

.ranking-badges {
    display: flex;
    justify-content: center;
    gap: 0.3rem;
    margin: 0.3rem 0;
    flex-wrap: wrap;
}

.ranking-buttons {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.8rem;
}

.ranking-btn {
    flex: 1;
    padding: 0.6rem 1rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
}

.contact-btn {
    background: linear-gradient(135deg, #ff1f8f, #ff6b35);
    color: white;
}

.contact-btn:hover {
    background: linear-gradient(135deg, #e01a7a, #e55a2b);
    transform: translateY(-2px);
}

.contact-btn:disabled {
    background: linear-gradient(135deg, rgba(255, 31, 143, 0.5), rgba(255, 107, 53, 0.5));
    cursor: not-allowed;
    transform: none;
    opacity: 0.7;
}

.contact-btn:disabled:hover {
    transform: none;
    background: linear-gradient(135deg, rgba(255, 31, 143, 0.5), rgba(255, 107, 53, 0.5));
}

.profile-btn {
    background: linear-gradient(45deg, #7928ca, #8a2be2);
    color: white;
}

.profile-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(121, 40, 202, 0.4);
}

@media (max-width: 1024px) {
    .top-ranking-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .top-ranking-grid {
        grid-template-columns: 1fr;
    }

    .ranking-buttons {
        flex-direction: column;
    }
}

.ranking-badges {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin: 0.5rem 0;
    flex-wrap: wrap;
}

.badge {
    padding: 0.2rem 0.5rem;
    border-radius: 3px;
    font-size: 0.6rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.2rem;
}

.badge.vip {
    background: #ff1f8f;
    color: white;
}

.badge.verified {
    background: #2ed573;
    color: white;
}

.badge.tipo {
    background: #7928ca;
    color: white;
}

.ranking-stats {
    display: flex;
    gap: 1rem;
    margin: 0.5rem 0;
    flex-wrap: wrap;
}

.stat {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.8);
    background: rgba(255, 255, 255, 0.1);
    padding: 0.2rem 0.5rem;
    border-radius: 12px;
    backdrop-filter: blur(10px);
}

.stat i {
    color: #ff1f8f;
}

/* Indicadores de carga */
.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    color: #fff;
}

.loading-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-left: 4px solid #ff1f8f;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.loading-container p {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
}

/* Estado vacío */
.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    color: #fff;
    text-align: center;
}

.empty-state i {
    font-size: 4rem;
    color: rgba(255, 255, 255, 0.3);
    margin-bottom: 1.5rem;
}

.empty-state h3 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #fff;
}

.empty-state p {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
}

/* Mejoras en las estadísticas */
.ranking-stats {
    display: flex;
    gap: 1rem;
    margin: 0.5rem 0;
    flex-wrap: wrap;
}

.ranking-stats .stat {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.8);
    background: rgba(255, 255, 255, 0.1);
    padding: 0.2rem 0.5rem;
    border-radius: 12px;
    backdrop-filter: blur(10px);
}

.ad-meta {
    display: flex;
    gap: 1rem;
    margin: 0.5rem 0;
    flex-wrap: wrap;
}

.ad-meta .location,
.ad-meta .views {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.8);
    background: rgba(255, 255, 255, 0.1);
    padding: 0.2rem 0.5rem;
    border-radius: 12px;
    backdrop-filter: blur(10px);
}

/* Mejoras en las tarjetas de anuncios */
.featured-ad {
    cursor: pointer;
    transition: all 0.3s ease;
}

.featured-ad:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(255, 31, 143, 0.2);
}

/* Mejoras en los botones */
.ranking-buttons,
.ad-buttons {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
}

.ranking-btn,
.ad-btn {
    flex: 1;
    padding: 0.6rem 1rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
}

.contact-btn {
    background: linear-gradient(135deg, #ff1f8f, #ff6b35);
    color: white;
}

.contact-btn:hover {
    background: linear-gradient(135deg, #e01a7a, #e55a2b);
    transform: translateY(-2px);
}

.whatsapp-btn {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.whatsapp-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
}

/* Responsive mejoras */
@media (max-width: 768px) {

    .ranking-stats,
    .ad-meta {
        gap: 0.5rem;
    }

    .ranking-stats .stat,
    .ad-meta .location,
    .ad-meta .views {
        font-size: 0.75rem;
        padding: 0.15rem 0.4rem;
    }

    .ranking-buttons,
    .ad-buttons {
        flex-direction: column;
        gap: 0.3rem;
    }

    .ranking-btn,
    .ad-btn {
        font-size: 0.8rem;
        padding: 0.5rem 0.8rem;
    }
}

.vip-badge-container {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
}

.vip-modelo {
    background: linear-gradient(135deg, #ff1f8f, #ff6b35);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-size: 0.8rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    box-shadow: 0 0 15px rgba(255, 31, 143, 0.4);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.vip-modelo i {
    color: #ffd700;
}

.ad-badges {
    display: flex;
    justify-content: center;
    gap: 0.25rem;
    margin: 0.4rem 0 0.6rem 0;
    flex-wrap: wrap;
}

.badge {
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-size: 0.6rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.2rem;
    text-transform: uppercase;
    letter-spacing: 0.3px;
}

.badge.recomendada {
    background: linear-gradient(135deg, #2ed573, #17c0eb);
    color: white;
    box-shadow: 0 0 8px rgba(46, 213, 115, 0.3);
}

.badge.verificada {
    background: linear-gradient(135deg, #3742fa, #5352ed);
    color: white;
    box-shadow: 0 0 8px rgba(55, 66, 250, 0.3);
}

.badge.vip {
    background: linear-gradient(135deg, #ff1f8f, #ff6b35);
    color: white;
    box-shadow: 0 0 8px rgba(255, 31, 143, 0.3);
}

.badge.verified {
    background: linear-gradient(135deg, #2ed573, #17c0eb);
    color: white;
    box-shadow: 0 0 8px rgba(46, 213, 115, 0.3);
}

.badge.recomendada {
    background: linear-gradient(135deg, #2ed573, #17c0eb);
    color: white;
    box-shadow: 0 0 8px rgba(46, 213, 115, 0.3);
}

.badge.tipo {
    background: linear-gradient(135deg, #7928ca, #8a2be2);
    color: white;
    box-shadow: 0 0 8px rgba(121, 40, 202, 0.3);
}

.ad-info h2 {
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    text-align: center;
    line-height: 1.2;
}

.ad-info p {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 0.3rem;
    text-align: center;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.ad-meta {
    display: flex;
    gap: 0.8rem;
    margin: 0.6rem 0;
    flex-wrap: wrap;
    justify-content: center;
}

.ad-meta .location,
.ad-meta .views {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.8);
    background: rgba(255, 255, 255, 0.1);
    padding: 0.2rem 0.4rem;
    border-radius: 10px;
    backdrop-filter: blur(10px);
}

.ad-buttons {
    display: flex;
    gap: 0.6rem;
    margin-top: 1rem;
    justify-content: center;
}

.ad-btn {
    flex: 1;
    padding: 0.6rem 1rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
}

.join-stream-btn:disabled {
    background: rgba(255, 255, 255, 0.05);
    cursor: not-allowed;
    transform: none;
    opacity: 0.7;
}

.join-stream-btn:disabled:hover {
    transform: none;
    background: rgba(255, 255, 255, 0.05);
}
</style>