class SceneTutorial extends GameScene {

    get backgroundPhoto() {
        return 'backgroundSceneTutorial';
    }

    preload() {
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

        const alpha = 0;

        {
            const lvl1Btn = game.add.button(
                0, 0,
                'circleMask',
                () => this._setScene('Scene1'),
                this, 2, 1, 0
            );
            lvl1Btn.scale.setTo(.4, .4);
            lvl1Btn.alpha = alpha;
        }

        {
            const lvl2Btn = game.add.button(
                450, 0,
                'circleMask',
                () => alert('Пока такой сцены нет'),
                this, 2, 1, 0
            );
            lvl2Btn.scale.setTo(.4, .4);
            lvl2Btn.alpha = alpha;
        }

        {
            const lvl3Btn = game.add.button(
                900, 0,
                'circleMask',
                () => alert('Пока такой сцены нет'),
                this, 2, 1, 0
            );
            lvl3Btn.scale.setTo(.4, .4);
            lvl3Btn.alpha = alpha;
        }

        {
            const lvl4Btn = game.add.button(
                0, 360,
                'circleMask',
                () => this._setScene('Scene2'),
                this, 2, 1, 0
            );
            lvl4Btn.scale.setTo(.4, .4);
            lvl4Btn.alpha = alpha;
        }

        ThemeSound.init();
        ThemeSound.play();

        super.create();
    }
}
