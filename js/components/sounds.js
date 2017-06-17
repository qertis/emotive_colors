class ThemeSound {

    static init() {
        this.audio = game.add.audio('theme');
        this.audio.loop = true;
    }

    static pause() {
        this.audio.pause();
    }

    static resume() {
        this.audio.resume();
    }

    static play() {
        this.audio.play();
    }

}