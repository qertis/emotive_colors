const game = new Phaser.Game(1280, 720, Phaser.WEBGL, 'mts-game', {
    preload,
    create
});

function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    this.progress = game.add.text(game.world.centerX, this.game.world.centerY - 30, 'Загружаемся...', {
        fill: 'white'
    });
    this.progress.anchor.setTo(.5, .5);
    this.game.load.onFileComplete.add(progress => {
        this.progress.text = `Загружено ${progress}%`;
    });

    // Backgrounds
    game.load.image('backgroundSceneTutorial', '/assets/img/tutorial/background.jpg');
    game.load.image('backgroundScene1', '/assets/img/scene1/background.png');
    game.load.image('backgroundScene2', '/assets/img/scene2/tomato.png');

    // Sprites
    game.load.image('circleMask', '/assets/img/circle.png');
    game.load.image('button', '/assets/img/nextLevel.png');
    game.load.image('apple', '/assets/img/scene1/apple.png');
    game.load.image('appleFace', '/assets/img/scene1/appleFace.png');

    // Songs
    game.load.audio('theme', '/assets/audio/theme.ogg');
    game.load.audio('sadSong', '/assets/audio/sadSong.ogg');
    game.load.audio('fanSong', '/assets/audio/fanSong.ogg');
}

function create() {
    game.state.add('SceneTutorial', SceneTutorial);
    game.state.add('Scene1', Scene1);
    game.state.add('Scene2', Scene2);
    game.state.add('Scene3', Scene3);

    game.state.start('SceneTutorial');
}

window.game = game;