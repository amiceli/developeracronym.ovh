<template>
    <div class="ac-about">
        <h1>
            Me
        </h1>
        <p>
            My name is Antoine, I'm a french web developper and I build
            stupid (or fun) website when I'm bored.
        </p>
        <h1>
            developeracronym.co
        </h1>
        <p>
            I was hanging out at Linkedin, and I saw friends with title like developer MERN or MEAN. <br>
            I figured, why I don't have an acronym like this? <br>
            So I create this website ! <br>
            I work with Vue, Typescript and Php so now, I'm a VTP web developer !
        </p>
        <h1>
            Technologies
        </h1>
        <p>
            This website is built with Vue and Nodejs for netlify serverless functions. <br>
            It's deployed on Netlify. <br>
            I Use Nord CSS color palette.

            <br>
            <br>

            Favicon generated with
            <a
                href="https://favicon.io/favicon-generator/"
                rel="noopener noreferrer"
                target="_blank"
            >
                https://favicon.io/favicon-generator/
            </a>
        </p>
        <h1>
            allacronyms.com
        </h1>
        <p>
            I didn't found API to search acronym, currently I "scrap" results from
            <a href="https://www.allacronyms.com/">
                https://www.allacronyms.com/
            </a>
        </p>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.ac-about {
    padding-left: 100px;
    padding-top: 50px;

    h1 {
        font-weight: 500;
        color: $nord1;
        text-transform: uppercase;
    }

    p {
        color: $nord0;
        line-height: 30px;
    }
}
</style>