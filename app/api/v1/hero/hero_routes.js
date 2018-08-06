module.exports = (router, heroController) => {
    router.get('/health-check', (req, res) => {
        res.status(200).json({});
    });

    router.get('/', (req, res, next) => heroController.getUsers(req, res, next));

    router.get('/super-hero', (req, res, next) => heroController.getAllSuperHeroes(req, res, next));
    router.get('/super-hero/:id', (req, res, next) => heroController.getSuperHero(req, res, next));
    router.post('/super-hero', (req, res, next) => heroController.createSuperHero(req, res, next));
    router.put('/super-hero', (req, res, next) => heroController.updateSuperHero(req, res, next));
    router.delete('/super-hero', (req, res, next) => heroController.deleteSuperHero(req, res, next));

    router.get('/super-power', (req, res, next) => heroController.getAllSuperPowers(req, res, next));
    router.post('/super-power', (req, res, next) => heroController.createSuperPower(req, res, next));
    router.get('/super-power/:id', (req, res, next) => heroController.getSuperPower(req, res, next));
    router.put('/super-power', (req, res, next) => heroController.updateSuperPower(req, res, next));
    router.delete('/super-power', (req, res, next) => heroController.deleteSuperPower(req, res, next));

    router.get('/help-me', (req, res, next) => heroController.helpMe(req, res, next));
    router.post('/protection-area', (req, res, next) => heroController.createProtectionArea(req, res, next));
    router.post('/super-hero/give-power', (req, res, next) => heroController.giverSuperHeroSuperPower(req, res, next));

    router.post('/login', (req, res, next) => heroController.login(req, res, next));
    router.get('/user', (req, res, next) => heroController.getAllUsers(req, res, next));
    router.post('/sign-in', (req, res, next) => heroController.insertUser(req, res, next));
    router.delete('/user', (req, res, next) => heroController.deleteUser(req, res, next));
    router.put('/user', (req, res, next) => heroController.updateUser(req, res, next));

    return router;
};
