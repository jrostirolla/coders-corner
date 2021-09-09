const router = require('express').Router();
const { User, Blogpost, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
let nodemailer = require('nodemailer');

//find users page
router.get('/user/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.param.id, {
      include: [{
        model: Blogpost,
        attributes: ['id', 'title', 'body', 'date_created']
      },
      {
        model: Comment,
        attributes: ['id', 'content', 'date_created']
      }]
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
})

//find all users
router.get('/users_all', async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [{
        model: Blogpost,
        attributes: ['id', 'title', 'body', 'date_created']
      },
      {
        model: Comment,
        attributes: ['id', 'content', 'date_created']
      }]
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
})


//create new account
router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const userData = await User.create({ 
      email:req.body.email, 
      password:req.body.password, 
      name:req.body.name, 
      city:req.body.city, 
      coding_language:req.body.coding_language 
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });

    function emailer(clientEmail) {
      console.log("emailer now running", clientEmail);
    
      let mailTransporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: 'coderscorner@outlook.com',
            pass: "JAWS!821"
        }
    });
    
    let mailDetails = {
        from: 'codersCorner@outlook.com',
        to: `${clientEmail}`,
        subject: "A Verification",
        text: `Hi there!
                
            Welcome to Coders Corner, your home for all things code. 
            Before continuing to access our site, we just need you to verify your account.
            Please click on the link below to confirm you are who you say you are
            
                INSERT LINK HERE TO PROFILE PAGE!
    
            Kind regards,
            The IT team at Coders Corner
            `
    };
    
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log(err);
        } else {
            console.log("email sent successfully", clientEmail);
        }
    });
      
    }

    emailer(req.body.email);

  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

//login route
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Wrong email or password used. Please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Wrong email or password used. Please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: '😎Welcome! You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

//logout route
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});




module.exports = router;
