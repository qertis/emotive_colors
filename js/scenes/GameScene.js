class GameScene {

    _setScene(scene) {
        const sceneIn = Phaser.Plugin.StateTransition.In.ScaleUp;
        sceneIn.duration = 400;
        const sceneOut = Phaser.Plugin.StateTransition.Out.ScaleUp;
        sceneOut.duration = 300;

        if (this.successAudio) {
            this.successAudio.stop();
        }

        if (this.videoImage) {
            this.videoImage.destroy();
        }

        if (this.video) {
            this.video.destroy();
        }

        game.state.start(
            scene,
            sceneOut,
            sceneIn,
            true
        );
    }

    _initBackground() {
        const backgroundLayer = game.add.group();
        backgroundLayer.create(0, 0, this.backgroundPhoto);

        const fon = game.add.group();
        fon.create(0, 0, this.backgroundPhoto);
        {
            const noiseFilter = new Phaser.Filter(game, null, shaders.fragmentSrc);
            noiseFilter.setResolution(game.width, game.height);
            fon.width = game.width;
            fon.height = game.height;
            noiseFilter.speed = 20.0;
            noiseFilter.intensity = 0.90;

            this.gravityFilter = noiseFilter;
            fon.filters = [noiseFilter];
        }
    }

    createCircle(x, y, size) {
        const circle = game.add.sprite(x, y, 'circleMask');

        const appendCircleToContainer = () => {
            circle.anchor.setTo(.5, .5);
            circle.scale.setTo(size, size);
            circle.alpha = .0;
            this.circles.push(circle);
        };

        const createPoint = (x, y, radius) => {
            this.bmd.circle(x, y, size, 'rgba(0,0,0,1)');
            this.maskMatrix.push({x, y, radius});
        };

        // Создаем матрицу по которой понимаем, заполнен ли рисунок
        const appendMatrix = () => {
            const size = 4;
            const distancePart = circle.width / 4;
            const length = Math.floor(circle.width / distancePart);
            const radius = circle.width / 2;
            const myLen = length / 2 - 1;

            if (myLen <= 2) {
                createPoint(circle.x, circle.y, radius);
                return;
            }

            for (let i = -myLen; i <= myLen; i += 2) {
                for (let j = -myLen; j <= myLen; j += 2) {
                    const x = circle.x + i * distancePart;
                    const y = circle.y + j * distancePart;
                    const vec1 = new Phaser.Point(x, y);
                    const vec2 = new Phaser.Point(circle.x, circle.y);

                    if (vec1.distance(vec2) < radius) {
                        createPoint(x, y, size);
                    }
                }
            }
        };

        appendCircleToContainer();
        appendMatrix();
    }

    preload() {
        this.canDrawing = true;
        this.circles = [];
        this.maskMatrix = [];
        this.bmd = game.add.bitmapData(game.width, game.height);
        this.bmdDest = game.add.bitmapData(game.width, game.height);
        this.progress = game.add.text(
            game.world.centerX, game.world.centerY - 30,
            'Загружаемся...', {fill: 'white'}
        );
        this.progress.anchor.setTo(.5, .5);
        game.load.onFileComplete.add(progress => this.progress.text = `${progress}%`);
    }

    update() {
        this.bmdDest.copy(this.bmd, 0, 0);
    }

    paint(pointer, x, y) {
        if (pointer.isDown && this.canDrawing) {
            const size = 9;
            const vecPoint = new Phaser.Point(x, y);
            let isHit = false;

            // Сравниваем, попали ли мы в маску
            const hintMask = () => {
                for (let i = 0; i < this.maskMatrix.length; i++) {
                    const {x, y, radius} = this.maskMatrix[i];
                    const vecMask = new Phaser.Point(x, y);
                    const distance = vecPoint.distance(vecMask);

                    if (distance < radius) {
                        this.maskMatrix.splice(i, 1);
                        return;
                    }
                }
            };

            // Рисуем точки
            const drawCircle = (circle) => {
                const radius = circle.width / 2;
                const vecCircle = new Phaser.Point(circle.x, circle.y);

                if (vecPoint.distance(vecCircle) < radius) {
                    this.bmd.circle(x, y, size, 'rgba(0,0,0,0.5)');
                    isHit = true;
                }
            };

            // Проверяем выигршность
            const checkWin = () => {
                if (this.maskMatrix.length === 0) {
                    const successAudio = this.successAudio = game.add.audio(this.successSong);
                    successAudio.loop = true;

                    ThemeSound.pause();
                    successAudio.play();

                    const video = this.video = game.add.video(this.successVideo);
                    const videoImage = this.videoImage = video.addToWorld(game.world.centerX, game.world.centerY, .5, .5, 1, 1);

                    game.add.tween(videoImage)
                        .from({alpha: 0}, 1000,
                            Phaser.Easing.Linear.None, true)
                        .to({alpha: 1},
                            1000,
                            Phaser.Easing.Linear.None, true);

                    game.time.events.add(900, () => {
                        // Скрываем отображение старого вида
                        game.world.children
                            .filter(child => child.type === 2 && !child === videoImage)
                            .forEach(child => {
                                child.visible = false
                            });
                        video.play(true);
                    });

                    this.canDrawing = false;
                }
            };

            const showNextScreenBtn = () => {
                if (!this.canDrawing) {
                    const onButtonClick = () => {
                        const currentLevel = Number(game.state.current.replace('Scene', ''));
                        this._setScene(`Scene${currentLevel + 1}`);
                    };
                    const nextSceneButton = game.add.button(1150, 600, 'button', onButtonClick, this, 2, 1, 0);
                    const setupButtonAnimation = () => {
                        game.add.tween(nextSceneButton)
                            .from({angle: -2}, 1000, Phaser.Easing.Back.InOut, true, 0, false)
                            .to({angle: 7}, 1000, Phaser.Easing.Back.InOut, true, 0, false)
                            .yoyo(true);

                        game.add.tween(nextSceneButton.scale)
                            .to({x: 1.1, y: 1.2}, 1000, Phaser.Easing.Back.InOut, true, 0, false)
                            .yoyo(true);
                    };
                    setupButtonAnimation();
                }
            };

            const showWord = () => {
                if (!this.canDrawing) {
                    const style = {
                        font: '88px Neucha',
                        fill: this.wordColor || '#000',
                        boundsAlignH: 'center',
                        boundsAlignV: 'middle',
                        stroke: '#fff',
                        strokeThickness: 1
                    };
                    const successText = game.add.text(0, 0, this.word, style);
                    successText.setTextBounds(0, 100, game.width, game.height / 2 - 200);
                    successText.alpha = 0.2;

                    const setupTextAnimation = () => {
                        game.add.tween(successText)
                            .to({alpha: 1}, 1500, Phaser.Easing.Exponential.Out, true, 0, false);
                    };
                    setupTextAnimation();

                    this.canDrawing = false;
                }
            };

            // Проверка на вхождение внутри другого спрайта
            const checkMaskCollision = () => {
                this.circles.forEach(circle => drawCircle(circle));
            };

            checkMaskCollision();

            if (isHit) {
                hintMask();
                checkWin();
                showWord();
                showNextScreenBtn();
            }

        }
    }

    create() {
        game.input.addMoveCallback(this.paint, this);
        this.bmdDest.addToWorld();
    }

}