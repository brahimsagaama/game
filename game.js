document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    let playerX = canvas.width / 2;  // Position horizontale de la tortue
    let playerY = canvas.height - 80;  // Position verticale de la tortue
    let enemies = [];
    let enemyTimer = 0;
    let enemiesCaught = 0;

    // Fonction pour dessiner la tortue
    function drawTurtle(playerX, playerY) {
        // Dessiner la carapace de la tortue (un grand cercle)
        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.arc(playerX, playerY, 40, 0, Math.PI * 2);  // Carapace
        ctx.fill();

        // Dessiner la tête (un petit cercle au-dessus de la carapace)
        ctx.fillStyle = 'lightgreen';
        ctx.beginPath();
        ctx.arc(playerX, playerY - 45, 15, 0, Math.PI * 2);  // Tête
        ctx.fill();

        // Dessiner les pattes (quatre petits cercles)
        ctx.fillStyle = 'darkgreen';
        ctx.beginPath();
        ctx.arc(playerX - 30, playerY + 30, 10, 0, Math.PI * 2);  // Patte gauche
        ctx.arc(playerX + 30, playerY + 30, 10, 0, Math.PI * 2);  // Patte droite
        ctx.arc(playerX - 30, playerY - 30, 10, 0, Math.PI * 2);  // Patte avant gauche
        ctx.arc(playerX + 30, playerY - 30, 10, 0, Math.PI * 2);  // Patte avant droite
        ctx.fill();
    }

    // Dessiner les ennemis
    function drawEnemies() {
        enemies.forEach(enemy => {
            ctx.fillStyle = 'red';
            ctx.fillRect(enemy.x, enemy.y, 30, 20);  // Ennemis sous forme de rectangle
        });
    }

    // Vérifier les collisions et mettre à jour les ennemis capturés
    function updateGame() {
        enemies.forEach(enemy => enemy.y += 2);  // Déplacement des ennemis

        // Vérifier la collision entre la tortue et les ennemis
        enemies = enemies.filter(enemy => {
            const hit = (playerX - 40 < enemy.x + 30 && playerX + 40 > enemy.x) &&
                        (playerY - 45 < enemy.y + 20 && playerY + 45 > enemy.y);  // Détection de collision
            if (hit) {
                enemiesCaught++;  // Incrémenter les ennemis capturés
                return false;
            }
            return enemy.y < canvas.height;
        });

        // Ajouter de nouveaux ennemis
        if (enemyTimer === 0) {
            enemies.push({ x: Math.random() * (canvas.width - 30), y: 0 });
            enemyTimer = 100;
        } else {
            enemyTimer--;
        }
    }

    // Afficher le score d'ennemis capturés
    function drawScore() {
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText(`Enemies Caught: ${enemiesCaught}`, 10, 30);
    }

    // Boucle principale du jeu
    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);  // Nettoyer l'écran

        // Dessiner la tortue
        drawTurtle(playerX, playerY);

        // Dessiner les ennemis
        drawEnemies();

        // Afficher le score
        drawScore();

        // Mettre à jour l'état du jeu
        updateGame();

        requestAnimationFrame(gameLoop);  // Répéter la boucle du jeu
    }

    // Gérer les déplacements de la tortue
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && playerX > 40) playerX -= 10;  // Déplacement à gauche
        if (e.key === 'ArrowRight' && playerX < canvas.width - 40) playerX += 10;  // Déplacement à droite
    });

    // Démarrer le jeu
    gameLoop();
});

