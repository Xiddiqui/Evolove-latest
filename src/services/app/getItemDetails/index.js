import { appImages } from "../../../globals/utilities/assets";

export const SECTIONS = [
    {
      title: "Description",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis neque molestie elementum, id ut condimentum quis. Vitae nisi, sem facilisis sed fringilla. Nunc, aliquam nunc cras Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis neque molestie elementum, id ut condimentum quis. Vitae nisi, sem facilisis sed fringilla. Nunc, aliquam nunc cras",
        flag:false,
      icon: "newsletter",
      reviewFlag:false
    },
    {
      title: "About Publisher",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis neque molestie elementum, id ut condimentum quis. Vitae nisi, sem facilisis sed fringilla. Nunc, aliquam nunc cras",
      flag: true,
      icon: "hair-cross",
      publisherImage:appImages.user1,
      publisherName:'Esther Howard',
      designation:'Meditation Speacialist',
      reviewFlag:false
    },
    {
      title: "Reviews",
      content: "ahvfh",
      flag:false,
      icon: "bookmark",
      reviewFlag:true,
      reviews:[{
          image:appImages.user2,
          name: 'guy Hawkins',
          text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis neque molestie elementum,'
      }]
    },
    
  ]