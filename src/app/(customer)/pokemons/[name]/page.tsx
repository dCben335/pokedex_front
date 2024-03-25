"use client";

import usePokemon from '@/hooks/Pokemons/usePokemon';
import styles from './page.module.scss';
import { toast } from 'sonner';
import { notFound } from 'next/navigation';
import { firstLetterOfEachWordUppercase, firstLetterUppercase, unslugify } from '@/utils/reformat';
import { usePokemonTypesContext } from '@/components/providers/PokemonTypesContext';
import { useTheme } from '@/components/providers/ThemeContext';
import { useEffect } from 'react';
import StyledImage from '@/components/ui/StyledImage/StyledImage';

interface PagePops {
    params: {
        name: string;
    };
}

const Page = ({ params }: PagePops) => {
    const { changeColor, color } = useTheme();
    const { findType } = usePokemonTypesContext();

    const { data, isLoading, error } = usePokemon(
        firstLetterOfEachWordUppercase(unslugify(params.name))
    );
    
    useEffect(() => {
        if (!data?.types || data.types.length === 0) return;
    
        const firstType = findType(data.types[0]);

        if (firstType && color !== firstType?.color) {
            changeColor(firstType.color);
        }
    }, [data]);
    

    if (isLoading) {
        return <></>
    }

    if (error) {
        toast.error(error.message);
        return notFound();
    }

    if (!data) {
        return <p>No data</p>;
    }

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <StyledImage 
                    className={styles.imageContainer}
                    src={data.imgUrl} 
                    alt={data.name} 
                    fill
                />
                <div>
                    <h1>{data.name}</h1>
                    <p>{data.description}</p>
                    <h3>Types</h3>
                    <ul>
                        {data.types.map((type) => (
                            <li key={type} style={{
                                backgroundColor: findType(type)?.color
                            }}>{firstLetterUppercase(type)}</li>
                        ))}
                    </ul>               
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus officiis impedit totam numquam soluta tempora omnis consectetur, labore eius recusandae amet voluptatibus repudiandae ad obcaecati quisquam mollitia ab saepe fugit, a esse. At similique ut omnis, obcaecati, cum ipsa dolorum laudantium necessitatibus quos harum odit aspernatur expedita magnam maxime laboriosam blanditiis a vitae eligendi inventore quia sit consectetur tempore, praesentium odio? Doloremque minima tempora reiciendis cupiditate vel dolor odio facilis ipsa facere, consequuntur nemo necessitatibus placeat labore! Deserunt perspiciatis, omnis dolor, a mollitia aliquid nisi quam, harum facere minus rem iure. Sed autem dolor eum itaque esse quidem incidunt molestiae id quibusdam reprehenderit adipisci unde quia neque, sit molestias quas, eligendi commodi repudiandae. Id, adipisci quo libero, autem incidunt laudantium consectetur corporis velit assumenda cupiditate veniam dolorem placeat earum labore blanditiis ducimus harum. Numquam a doloribus laborum accusamus non similique magnam accusantium soluta repudiandae ad saepe inventore vitae, minima nobis optio, tempora officiis? Ullam quod magnam non ratione recusandae. Culpa laudantium a commodi accusantium neque error sed eveniet sint unde. Cumque fugit, culpa, magni veritatis voluptatum labore dolorum recusandae rerum mollitia in excepturi quasi maiores. Itaque accusamus, delectus blanditiis esse minima temporibus deserunt molestiae alias quae dolores sit ab et consequatur porro possimus! Ducimus ipsa fugiat dicta tempore. Fuga reprehenderit asperiores illum rerum aut error quas velit, ex voluptatem corrupti necessitatibus sunt. Reiciendis repellendus officia tenetur excepturi incidunt ratione est provident! Maxime consequatur ratione quis corporis, ducimus sint esse exercitationem, eos voluptas enim ullam deleniti officiis earum officia vel et. Quo ipsam debitis enim! Repudiandae debitis eum error nulla et asperiores sint adipisci tenetur eos nobis ducimus eius quibusdam, iusto obcaecati excepturi rerum optio tempore deserunt. Amet, aliquid ex? Aperiam, fugiat quidem! Facere consequatur dignissimos doloribus temporibus? Quo ipsum numquam harum quasi, dolorum temporibus sit reprehenderit, maiores eum assumenda pariatur labore laborum esse ea mollitia placeat culpa ipsam eius sed hic accusamus. Sapiente, delectus architecto? Quidem exercitationem necessitatibus accusantium quibusdam atque maxime incidunt, sed voluptatum, neque esse, eius voluptas magnam obcaecati eaque adipisci distinctio accusamus repellat. Deleniti, omnis! Laudantium, doloremque perspiciatis? Ea reprehenderit fugiat ab est veritatis impedit dolorem, excepturi distinctio amet corporis incidunt suscipit iure! Maiores delectus, architecto neque perferendis corrupti adipisci, fugiat porro asperiores, facilis expedita voluptate dolore totam mollitia quisquam maxime? Natus vero repellendus excepturi, maxime sint velit cum delectus id. Esse suscipit quo totam quis quas. At fugit officiis possimus, quaerat iste vitae asperiores error eos quibusdam dicta esse a illo cumque ducimus qui sit suscipit autem impedit quo. Commodi doloribus quas aut vel perferendis necessitatibus dignissimos, quisquam autem blanditiis dolore fuga magnam ipsum unde repellendus sint fugiat natus sunt earum excepturi nulla ex. Facere veniam doloremque repellat aliquam voluptas, illo ratione vitae provident eveniet ipsum alias deleniti dignissimos quis rem magnam consectetur animi beatae sunt! Consequatur consectetur ullam illum, accusantium beatae tenetur asperiores, quidem optio id deserunt soluta quasi rerum in iste dicta iusto harum pariatur facere vero. Excepturi optio culpa et reprehenderit quod minima nisi similique, autem blanditiis temporibus molestiae ipsum laboriosam eum cum accusantium non! Magni, quas reiciendis ratione quia molestiae consectetur quibusdam! Exercitationem quos fugit suscipit blanditiis ab autem eos quia impedit soluta animi, rerum aspernatur repellendus, nisi minus voluptatum! Illo nihil eligendi veniam sed voluptate dolores esse voluptates itaque quidem quia facilis, inventore harum quas libero, nobis maiores magni dignissimos, eos illum adipisci omnis non iure tenetur! Temporibus repellendus assumenda adipisci explicabo fuga at unde voluptatum, obcaecati, dolorum fugit in earum rerum aliquam aliquid exercitationem iste perspiciatis veritatis tempore! Obcaecati molestiae nobis nisi, soluta magni quasi earum. Sapiente voluptatem adipisci inventore molestias quis libero. Cupiditate architecto nulla laudantium dicta repudiandae. Perspiciatis velit itaque dignissimos dolorem voluptate, sequi, et ea quis praesentium soluta aperiam, ratione totam at optio! Iste tempore voluptates enim blanditiis eligendi asperiores, modi optio, qui cupiditate aliquam pariatur quis voluptatum commodi numquam nesciunt officiis et deleniti ad repellat repellendus odit inventore excepturi libero quibusdam. Ducimus eius minima voluptates quos autem exercitationem fugit adipisci illo? Magnam, ipsum ex! Commodi sit vero perspiciatis, animi provident culpa, accusamus cumque quia dignissimos iste, odit voluptatibus. Ad ex incidunt hic officiis totam veritatis veniam nostrum tempora ab doloremque quaerat, eligendi praesentium maxime iste odio expedita quae, voluptate pariatur provident adipisci molestiae! Provident, voluptatum error. Optio eligendi recusandae quo repellat sequi! Molestias in veritatis, omnis adipisci, natus itaque fugit mollitia debitis nihil amet repudiandae ducimus vitae ratione! Voluptatem neque deleniti in odit rerum dolor excepturi, facere sint temporibus velit consectetur nulla expedita aperiam voluptate obcaecati, placeat laudantium repellendus necessitatibus nam illum reprehenderit voluptatibus ea maiores? Harum saepe nihil dolorem repellat praesentium, aliquid laboriosam, at cum sit accusamus tenetur quisquam nesciunt autem ipsa veniam alias cupiditate unde dolor, odio ipsam. Accusamus consequatur dolorum eos soluta voluptatum veritatis rerum ex aut ipsa magnam tempore nostrum adipisci nisi similique optio, ullam sed, eveniet iure asperiores repellat cupiditate. Omnis molestiae fugiat ab atque illo veritatis id veniam ex eaque labore consequatur, incidunt quia hic iste culpa, blanditiis qui. Itaque quisquam amet provident repellendus nisi aliquid sapiente, culpa rem explicabo eum quos ducimus, beatae incidunt facilis reiciendis pariatur, odit repudiandae ad aspernatur natus. Id voluptates perferendis animi cum voluptatem rem. Omnis, eveniet eaque! Tenetur recusandae enim libero aperiam aliquam mollitia maxime itaque voluptate sunt debitis ut sint, commodi saepe. Nihil incidunt voluptatibus earum voluptatum aliquam assumenda et sunt esse! Vero nulla consequatur illum, quas itaque expedita alias officia sint sunt iste reprehenderit. Totam amet voluptates reprehenderit quas numquam praesentium, sit dicta ex debitis commodi harum natus ullam sed deleniti iste atque sint? Voluptatem quaerat iure quam ducimus magnam molestiae dolore. Aperiam facilis, harum, veritatis adipisci vitae et consequatur deleniti tenetur veniam rem rerum quia qui perspiciatis ipsam recusandae doloribus quae sequi praesentium reprehenderit error eos quo dolore. Commodi blanditiis veritatis veniam alias esse nostrum possimus quaerat, in obcaecati error numquam, debitis sit. Earum adipisci et exercitationem, animi inventore fugiat repudiandae consequatur blanditiis provident incidunt in voluptas a expedita, amet, officiis dignissimos maxime suscipit dolor consectetur quia aut non. Maiores quod pariatur iusto amet nisi error eos vitae voluptatum exercitationem deleniti.</p>
                </div>
            </div>
        </main>
    );
}

export default Page;