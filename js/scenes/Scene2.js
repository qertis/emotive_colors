class Scene2 extends GameScene {

    get word() {
        return 'Гнев';
    }

    get successSong() {
        return 'sadSong';
    }

    get wordColor() {
        return '#6cbf00';
    }

    get successVideo() {
        return 'tomatoVideo';
    }

    get backgroundPhoto() {
        return 'backgroundScene2';
    }

    preload() {
        game.load.video('tomatoVideo', '/assets/video/tomato.mp4');
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
            // Коллизийные круги Левый глаз
            this.createCircle(576, 416, .03);
            this.createCircle(594, 422, .03);
            this.createCircle(609, 427, .03);

            // Првый глаз
            this.createCircle(673, 434, .03);
            this.createCircle(692, 419, .03);
            this.createCircle(706, 411, .03);

            // Рот
            this.createCircle(598, 501, .03);
            this.createCircle(630, 497, .03);
            this.createCircle(646, 498, .03);
            this.createCircle(667, 491, .03);
        }

        super.create();

        ThemeSound.resume();
    }
}
