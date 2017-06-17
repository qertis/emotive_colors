class Scene1 extends GameScene {

    get word() {
        return 'Радость';
    }

    get successSong() {
        return 'fanSong';
    }

    get wordColor() {
        return '#1467ff';
    }

    get successVideo() {
        return 'appleVideo';
    }

    get backgroundPhoto() {
        return 'backgroundScene1';
    }

    preload() {
        game.load.video('appleVideo', '/assets/video/apple.mp4');
        super.preload();
    }

    update() {
        super.update();

        if (this.gravityFilter) {
            this.gravityFilter.update(game.input.mousePointer);
        }
    }

    create() {
        super._initBackground();

        {
            // 1
            const apple = game.add.sprite(658, 420, 'apple');
            apple.anchor.setTo(.5, .5);

            const appleFace = game.add.sprite(-140, -50, 'appleFace');
            appleFace.pivot.setTo(.5,.5);
            apple.addChild(appleFace);
            appleFace.alpha = .4;
        }

        {   // Левый глаз
            this.createCircle(528, 463, .03);
            this.createCircle(534, 446, .03);
            this.createCircle(540, 430, .03);
            this.createCircle(558, 430, .03);
            this.createCircle(573, 436, .03);

            // Правый глаз
            this.createCircle(680, 415, .03);
            this.createCircle(689, 396, .03);
            this.createCircle(695, 383, .03);
            this.createCircle(723, 383, .02);
            this.createCircle(731, 389, .02);
            this.createCircle(746, 393, .02);

            // Рот
            this.createCircle(620, 535, .03);
            this.createCircle(648, 532, .03);
            this.createCircle(690, 530, .05);
            this.createCircle(711, 509, .05);
            this.createCircle(720, 490, .03);
        }

        super.create();

        ThemeSound.resume();
    }

}
