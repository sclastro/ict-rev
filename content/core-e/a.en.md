## 1.1 Curriculum requirements

Understand the basic concepts of technological innovations and their applications, with examples including pattern recognition through artificial intelligence (AI) and data science, 3D printing technologies, augmented reality (AR) and virtual reality (VR). Students should have practical experience with these technologies.

## 1.2 Artificial intelligence and pattern recognition

**Artificial intelligence (AI)** is a field of computer science that studies how computers and machines can simulate human intelligence, such as learning, problem solving and decision making. AI has developed rapidly in recent years mainly because huge amounts of data have become available and processing power has increased greatly.

**Pattern recognition** is the most common use of AI: the system analyses raw input data, finds the patterns and regularities in it, and then classifies the patterns detected.

| Input data | Examples |
|---|---|
| Images | Face unlock, licence plate recognition, handwriting recognition, finding lesions in medical images |
| Sound | Voice assistants understanding commands, speech-to-text |
| Text | Filtering spam emails, analysing whether customer reviews are positive or negative |

[adapted from 2025 Mock P1A Q40] A customer service system that replies automatically to customers' messages, and generating a new photo background from a text description, both involve AI; checking a bus's real-time location in an app only displays location data and does not involve AI.

Other branches of AI include computer vision, natural language processing, robotics and expert systems. **Natural language processing** enables computers to understand and process human language, as used in translation, chatbots, text-to-speech and speech-to-text; an **expert system** reasons with the knowledge of experts in a field to support decisions, e.g. assisting medical diagnosis. These branches are extension content.

## 1.3 Machine learning

**Machine learning** is a branch of AI in which a computer learns from large amounts of data, finds patterns, and then makes predictions or classifications; in general, the more data, the more accurate the predictions.

The process of building a machine learning model:

| Step | Work |
|---|---|
| 1. Collect data | Collect a large amount of data relevant to the task, e.g. photos of different vegetables |
| 2. Clean and prepare data | Remove duplicate or wrong data, fix inconsistencies, and add labels where needed |
| 3. Train the model | Let the computer find features and patterns in the data |
| 4. Test the model | Test the accuracy with data not used in training; if it is not good enough, collect more data and train again |

**Four ways of training a model**

| Method | Training data | Example |
|---|---|---|
| Supervised learning | All data is labelled (with the correct answers) | Training a system to tell fruits apart with photos labelled "apple" and "orange" |
| Unsupervised learning | Data is unlabelled; the computer groups it by similarity on its own | Dividing customers into groups by shopping behaviour |
| Semi-supervised learning | A small amount of labelled data plus a large amount of unlabelled data | Labelling only some photos and letting the system classify the rest |
| Reinforcement learning | No pre-labelled data; the system tries different actions and improves through feedback (rewards or penalties) | Chess programs, robots learning to walk |

> ⚠ **[2025 P1B 4(b)] Mary installs an AI system with cameras in a country park to detect fires. She needs to choose photo samples to train the AI system. Give two considerations that Mary should take into account.**
> ✔ A large number of photo samples; samples showing fire in different conditions (e.g. size, day and night, distance); samples including both photos with fire and photos without fire. (Any two)
> ✘ The HKEAA reported poor performance. Many candidates wrote factors unrelated to training the model, such as copyright or privacy; the clarity, resolution and file format of the photos were not accepted either.

**Deep learning** is a branch of machine learning that learns from large amounts of data using neural networks with many layers (an input layer, several hidden layers and an output layer), and is used in image recognition, speech recognition and so on. The details of neural networks are extension content.

Practical suggestion: use an online image classification training tool, take several dozen webcam photos of each of two objects, train a simple classification model, and compare the accuracy with different numbers of samples.

## 1.4 Data science and big data

**Data science** combines statistics, algorithms and machine learning to find hidden patterns and useful insights in large amounts of raw data, supporting decision making.

The general process: collect digital data → remove noise and errors from the data → identify patterns → classify the elements → analyse the data and draw insights.

**Big data** refers to data sets so large that they are difficult to manage with traditional data processing tools; sources include online shopping records, social media, sensors and satellite images. Big data has five characteristics (the 5Vs):

| Characteristic | Meaning |
|---|---|
| Volume | The amount of data is huge, coming from a vast number of sources |
| Velocity | Data is generated and needs processing very quickly |
| Variety | Data comes in many types, including structured (e.g. tables), semi-structured and unstructured (e.g. text, photos, videos) data |
| Veracity | The trustworthiness and accuracy of the data vary |
| Value | The commercial or social value obtained by analysing the data |

AI and data science are closely related: data science collects and analyses big data, and AI uses this data for reasoning and prediction. For example, a search engine analyses the keywords entered by large numbers of users to predict and display relevant results; an online shop recommends products based on customers' browsing and purchase records.

> ⚠ **[Sample Paper Section A Q38] Which of the following can support an artificial intelligence (AI) system? (1) Big data (2) Cloud computing (3) Machine learning**
> ✔ **(1), (2) and (3)**. Big data provides training material, cloud computing provides storage and processing power, and machine learning lets the system learn from data.
> ✘ Leaving out cloud computing: training AI models needs a lot of computing resources, often provided by cloud services.

Practical suggestion: organise a month of class tuck shop sales records in a spreadsheet and make a chart to find the busiest times, experiencing how insights are drawn from raw data.

## 1.5 Internet of Things

The **Internet of Things (IoT)** is a network of physical objects connected to a network. These objects have built-in sensors that collect data and exchange it with other objects, systems and users, allowing users to monitor and control them remotely.

| Application | Examples |
|---|---|
| Smart homes | Adjusting lighting automatically according to light levels; switching the air conditioner on or off remotely with a phone |
| Healthcare | Wearable devices monitoring heart rate and sending the data to healthcare workers |
| Logistics and retail | Tracking the location of goods; monitoring warehouse stock |
| Industry | Monitoring machine operation and predicting breakdowns |

IoT is also an important source of big data. Poorly secured IoT devices are easily hacked and the data they collect may leak, so default passwords should be changed and firmware updated regularly.

Practical suggestion: connect a temperature sensor to a microcontroller board and send the readings to a mobile app for display.

## 1.6 3D printing technologies

**3D printing** first designs a three-dimensional model with software; the printer then adds material layer by layer to make the real object, so it is also called **additive manufacturing**. Materials include plastics, resins, metals and even food.

| Comparison | Fused Deposition Modelling (FDM) | Stereolithography (SLA) | Selective Laser Sintering (SLS) |
|---|---|---|---|
| Material | Thermoplastic filament (e.g. PLA, ABS) | Liquid photosensitive resin | Powder (e.g. nylon) |
| How it works | Heats and melts the filament, extruding it layer by layer | Exposes the resin to ultraviolet light layer by layer, curing it | Sinters the powder layer by layer with a high-power laser |
| Advantages | Cheapest printers and materials; easy to use; no laser, so safer and suitable for homes and schools | Smooth surfaces; can make fine details | Strong products; can make complex shapes without support structures |
| Disadvantages | Lower accuracy; visible layer lines and rougher surfaces | Higher cost; the resin is an irritant and must be handled carefully; products need washing and post-curing | Expensive equipment and materials, mostly used in industry; fewer material choices |

**Benefits of 3D printing**: small numbers of prototypes can be made quickly and cheaply, so designers can test and improve them before mass production; products can be customised to individual needs, e.g. prostheses, implants and furniture made to personal measurements.

Practical suggestion: design a keyring with your initials using free online 3D design software, export an STL file, and print it with the school's FDM printer.

## 1.7 Augmented reality, virtual reality and mixed reality

| Comparison | Augmented reality (AR) | Virtual reality (VR) |
|---|---|---|
| Meaning | Overlays digital information on the real environment on a screen | Uses a computer simulation to create a completely virtual world in which users are immersed |
| What users see | The real environment plus virtual objects | Only the virtual world |
| Objects users interact with | Real and virtual objects | Only virtual objects |
| Common devices | Smartphones and tablets with cameras and screens, AR glasses | VR headsets, with headphones and hand controllers |
| Examples | Pointing a phone camera at a relic to show an introductory animation on screen; previewing virtual furniture in your home | Virtual museum tours; simulation training for pilots and surgeons; VR games |

> ⚠ **[Sample Paper Section A Q39] An animation appears on the screen of a smartphone when its camera is turned on to view a product in a supermarket. Which of the following is needed to produce the animation? (1) Data science (2) Augmented reality (AR) (3) 3D printing**
> ✔ **(2)** only. The animation is overlaid on the real environment captured by the camera, which is augmented reality.
> ✘ Choosing 3D printing: 3D printing makes physical objects and has nothing to do with an on-screen animation.

**Mixed reality (MR)** combines AR and VR so that real and virtual objects coexist and interact in real time, e.g. a flight simulator combining a real joystick with a virtual cockpit view. Mixed reality is introductory content.

Wearing a VR headset for long periods may cause eye strain, dizziness and neck discomfort, so take regular breaks.

Practical suggestion: use an AR app on a phone to place virtual furniture in the classroom and compare how it looks from different angles.

## 1.8 Applications of technological innovations

One application often combines several technologies.

| Area | Application | Technologies involved |
|---|---|---|
| Business | Chatbots on websites answering customer enquiries | AI |
| | Recommending products based on purchase records | AI, data science |
| | Previewing furniture at home with AR | AR |
| Industry | Inspecting products for defects with AI vision systems | AI, data science |
| | Predicting machine breakdowns from sensor data | AI, IoT |
| | Making prototypes quickly | 3D printing |
| | Safety training for dangerous work | VR, AR |
| Healthcare | Analysing medical images to assist diagnosis | AI, data science |
| | Monitoring health with wearable devices | IoT |
| | Printing prostheses and implants | 3D printing |
| Education | Virtual field trips, surgery simulations | VR |
| | Online learning platforms recommending content based on student performance | AI, data science |
| Home | Robot vacuum cleaners planning cleaning routes automatically | AI |
| | Controlling smart home devices remotely | IoT |

**Risks brought by new technologies**: generative AI can create realistic deepfake images and videos used to spread fake news, mislead the public and even affect social stability; when cultural relics are digitised with 3D modelling and VR, the digital models must also be protected from misappropriation and tampering.

[adapted from 2026 Mock P1A Q40] David generates images with an AI platform and puts them in a game he makes and charges for. The main risk he faces is copyright: the generated images may contain copyrighted content, and he did not check.

## 1.9 Self-test

<details><summary>1. What is pattern recognition? Give an example that uses images as input.</summary>

Pattern recognition analyses raw input data, finds the patterns and regularities in it, and then classifies the patterns detected. Examples: face unlock, licence plate recognition, finding lesions in X-ray images.
</details>

<details><summary>2. Man Kit trains a model with photos all labelled "tomato", "cucumber" or "carrot". Which training method is he using? Explain.</summary>

Supervised learning, because all the input data is labelled with the type of vegetable.
</details>

<details><summary>3. A retail company has a large number of unlabelled transaction records and wants to group customers with similar shopping behaviour. Which machine learning method should it use?</summary>

Unsupervised learning. It finds groups automatically by similarity in unlabelled data.
</details>

<details><summary>4. Man Kit's model is not accurate enough. Without changing the training method, suggest a way to improve it.</summary>

Collect more, and more varied, training data (e.g. photos from different angles and in different lighting), then retrain the model.
</details>

<details><summary>5. Name any two of the 5Vs of big data and explain their meanings.</summary>

Volume: the amount of data is huge; velocity: data is generated and processed very quickly; variety: it includes structured, semi-structured and unstructured data; veracity: the trustworthiness of the data varies; value: the commercial value obtained from analysis. (Any two)
</details>

<details><summary>6. Why is FDM the most common 3D printing method in homes and schools?</summary>

The printers and materials cost the least, it is easy to use, and it uses no laser, so it is safer.
</details>

<details><summary>7. Give one advantage and one disadvantage of SLA compared with FDM.</summary>

Advantage: smoother surfaces and finer details. Disadvantage: higher cost; the resin is an irritant and must be handled carefully.
</details>

<details><summary>8. Give one benefit of using 3D printing to make prototypes in manufacturing.</summary>

Small numbers of prototypes can be made quickly and cheaply, so the design can be tested and improved before mass production.
</details>

<details><summary>9. A history museum launches a mobile app: when the camera is pointed at a relic, information and animations about it appear on screen at once. Which technology is used? Give one benefit to visitors.</summary>

Augmented reality (AR). Visitors can look at the real relic while getting more information, which is more interesting and easier to understand.
</details>

<details><summary>10. Explain one difference between AR and VR.</summary>

AR overlays digital information on the real environment, so users see real and virtual objects together; VR immerses users completely in a computer-simulated virtual world, so they cannot see the real environment. (Or: AR commonly uses smartphones or tablets, while VR needs a headset)
</details>

<details><summary>11. How can a smart home robot vacuum cleaner apply AI and IoT? Give one of each.</summary>

AI: plan cleaning routes automatically, avoid obstacles, and gradually learn the most effective way to clean. IoT: users switch the robot on or off remotely with a smartphone and receive notifications of cleaning progress and battery level.
</details>

<details><summary>12. Give one social problem that the use of generative AI may cause.</summary>

It can create deepfake images and videos that spread fake news and mislead the public; or the generated content may infringe others' copyright.
</details>
