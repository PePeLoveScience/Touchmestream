import {
    loadFallbackTranslation
} from "./shared-52JE6R55.js";
import {
    getTranslations
} from "./shared-PQWVR7YF.js";
import "./shared-IZBMCQM6.js";
var COMMENTS = [{
        avatarPath: "./assets/images/woman/f_1.webp",
        name: "Ellie Brown",
        hoursAgo: "time_ago_1",
        content: "best_thing_i_ve_discovered_all_year",
        likes: "likes"
    },
    {
        avatarPath: "./assets/images/woman/f_2.webp",
        name: "Mei Lin",
        hoursAgo: "time_ago_1",
        content: "incredible",
        likes: "likes_66"
    },
    {
        avatarPath: "./assets/images/man/m_1.webp",
        name: "Noah Thompson",
        hoursAgo: "time_ago_1",
        content: "im_speechless_just_try_it",
        likes: "likes_55"
    },
    {
        avatarPath: "./assets/images/man/m_2.webp",
        name: "Evan Moore",
        hoursAgo: "time_ago_2",
        content: "100_recommend_this_to_everyone",
        likes: "likes_40"
    },
    {
        avatarPath: "./assets/images/woman/f_3.webp",
        name: "Amelia Taylor",
        hoursAgo: "time_ago_2",
        content: "max_you_nailed_it",
        likes: "likes_78"
    },
    {
        avatarPath: "./assets/images/woman/f_4.webp",
        name: "Ella Thompson",
        hoursAgo: "time_ago_3",
        content: "who_knew_it_could_be_this_easy",
        likes: "likes_58"
    },
    {
        avatarPath: "./assets/images/woman/f_5.webp",
        name: "Sofia Black",
        hoursAgo: "time_ago_4",
        content: "jack_i_know_right",
        likes: "likes_44"
    },
    {
        avatarPath: "./assets/images/man/m_3.webp",
        name: "Jake Santiago",
        hoursAgo: "time_ago_4",
        content: "amazing_experience",
        likes: "likes_65"
    },
    {
        avatarPath: "./assets/images/woman/f_6.webp",
        name: "Sophia Ross",
        hoursAgo: "time_ago_6",
        content: "so_simple_test_yet_so_effective",
        likes: "likes_50"
    },
    {
        avatarPath: "./assets/images/man/m_4.webp",
        name: "Luke Bennett",
        hoursAgo: "time_ago_6",
        content: "this_survey_just_made_my_day",
        likes: "likes_54"
    },
    {
        avatarPath: "./assets/images/woman/f_7.webp",
        name: "Rita Chen",
        hoursAgo: "time_ago_9",
        content: "its_rare_to_find_something_so_genuine",
        likes: "likes_30"
    },
    {
        avatarPath: "./assets/images/man/m_5.webp",
        name: "James Taylor",
        hoursAgo: "time_ago_9",
        content: "mind_blown",
        likes: "likes_48"
    },
    {
        avatarPath: "./assets/images/man/m_6.webp",
        name: "Liam Nelson",
        hoursAgo: "time_ago_12",
        content: "this_deserves_more_attention",
        likes: "likes_20"
    }
];
var COMMENTS_SELECTORS = {
    template: "#comment",
    container: ".comments__body",
    avatar: ".avatar",
    username: ".username",
    hoursAgo: ".time__ago",
    content: ".comment__text",
    likes: ".like__count",
    reply: ".reply",
    submitComment: ".submit__btn",
    commentForm: ".comment__form"
};
var generateComments = async () => {
    const translations = await getTranslations(loadFallbackTranslation);
    const commentTemplate = document.querySelector(COMMENTS_SELECTORS.template);
    const commentContainer = document.querySelector(COMMENTS_SELECTORS.container);
    COMMENTS.forEach((comment) => {
        const commentTemplateClone = document.importNode(commentTemplate.content, true);
        const avatar = commentTemplateClone.querySelector(COMMENTS_SELECTORS.avatar);
        const username = commentTemplateClone.querySelector(
            COMMENTS_SELECTORS.username
        );
        const hoursAgo = commentTemplateClone.querySelector(
            COMMENTS_SELECTORS.hoursAgo
        );
        const content = commentTemplateClone.querySelector(
            COMMENTS_SELECTORS.content
        );
        const likes = commentTemplateClone.querySelector(COMMENTS_SELECTORS.likes);
        const reply = commentTemplateClone.querySelector(COMMENTS_SELECTORS.reply);
        avatar.src = comment.avatarPath;
        username.textContent = comment.name;
        hoursAgo.textContent = translations[comment.hoursAgo];
        content.textContent = translations[comment.content];
        likes.textContent = translations[comment.likes];
        if (reply) {
            reply.textContent = translations.answer || "Answer";
        }
        commentContainer == null ? void 0 : commentContainer.appendChild(commentTemplateClone);
    });
};
generateComments();