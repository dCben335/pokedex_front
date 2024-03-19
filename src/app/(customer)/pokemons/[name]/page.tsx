"use client";

import useGetPokemon from '@/hooks/Pokemons/useGetPokemon';
import styles from './page.module.scss';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { firstLetterUppercase } from '@/utils/reformat';
import { usePokemonTypes } from '@/components/providers/PokemonTypesContext';
import { useTheme } from '@/components/providers/ThemeContext';
import { useEffect } from 'react';

interface PagePops {
    params: {
        name: string;
    };
}

const Page = ({ params }: PagePops) => {
    
    const router = useRouter();

    const { changeColor, color } = useTheme();
    const { findType } = usePokemonTypes();
    const { data, isLoading, error } = useGetPokemon(
        firstLetterUppercase(params.name)
    );

    
    useEffect(() => {
        if (!data?.types || data.types.length === 0) return;
    
        const firstType = findType(data.types[0]);

        if (firstType && color !== firstType?.color) {
            changeColor(firstType.color);
        }
    }, [data]);
    

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        toast.error(error.message);
        router.push('/');
    }

    if (!data) {
        return <p>No data</p>;
    }


    

    return (
        <main className={styles.main}>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo, nisi sit. Distinctio illo temporibus tempore autem consequatur provident quibusdam dolores natus. Velit a iusto, consequatur voluptas aut sed nihil hic amet eius quod necessitatibus ipsa voluptates excepturi sint distinctio consequuntur commodi, nostrum nulla qui quas cum adipisci dolorum reiciendis? Vitae, labore tenetur! Aperiam impedit reprehenderit deserunt cum, velit aspernatur praesentium ipsum doloremque dolorum sit mollitia optio fugiat sed perferendis ex consectetur unde quasi quam laborum et? Ut nisi tempora ratione quae impedit aspernatur repudiandae hic asperiores culpa quo. Debitis voluptates nostrum fugit eius laborum expedita nisi laboriosam nemo libero officia! Repellat dolor recusandae eius tempora enim, accusamus distinctio itaque suscipit vero asperiores, ipsum totam? Voluptates asperiores, nesciunt hic blanditiis aliquid sed temporibus iure doloribus fugiat molestias maiores ipsa iusto libero et quae fugit ex. Laborum, ullam iure sed ducimus dolor nostrum deserunt a dolores commodi minus fuga et provident odio fugiat tempora numquam nobis cupiditate qui, beatae, consequuntur in non quod atque. Temporibus fuga commodi voluptate atque adipisci officiis tempore, sed pariatur impedit eaque quaerat, enim ea doloribus veniam voluptates alias dolorem possimus consequatur velit deleniti nesciunt voluptatibus ex. Veritatis saepe voluptates reiciendis itaque asperiores aliquam cupiditate totam, soluta dolorum tenetur beatae rem harum repellendus pariatur consectetur reprehenderit obcaecati, perspiciatis minus, quasi consequuntur. Laudantium modi unde quod dignissimos eum natus! Pariatur velit earum quia labore officiis iure autem et illo dignissimos dolores nesciunt quasi ut minima amet, provident similique nam eligendi inventore? Unde, error. Animi sapiente consectetur laboriosam rerum harum quas provident dolores quo natus cumque mollitia, porro consequuntur repellat! Rem, error esse asperiores explicabo non illum ipsa facere, maiores at ipsam, minima repellat in? Tempora illum sequi id consectetur aperiam neque officiis cupiditate at nostrum atque, delectus facere ullam quibusdam inventore facilis ipsam corrupti doloremque quisquam. Excepturi provident sit nesciunt numquam pariatur voluptate ipsa at a eum! Delectus illum quis at eos facilis magni iure nostrum! Tempore voluptatem dignissimos architecto consectetur quibusdam commodi molestiae aliquam quisquam provident nisi laborum et reiciendis soluta voluptatibus, ullam nihil corporis officiis impedit minima assumenda rem facilis. Corporis voluptatem minima sequi quam repudiandae aut dolore, et consequatur, exercitationem possimus iste quidem. Explicabo animi laudantium mollitia nemo et, molestiae aspernatur consequuntur quaerat eaque, vero eius voluptates officia unde quo? Vero nisi beatae, officia cumque et reprehenderit natus saepe veritatis est fugit quam autem atque architecto distinctio, deserunt itaque temporibus quia voluptate? Amet corrupti numquam eum hic, dolorum cumque laudantium recusandae, possimus modi ad voluptatum distinctio explicabo accusantium impedit vitae pariatur fuga obcaecati doloremque itaque adipisci repellat laboriosam sed error? Iusto voluptates quo dicta minima omnis corporis quos. Libero tenetur, omnis voluptatem, velit iure aspernatur beatae modi laborum neque error doloribus soluta. Accusantium nisi id, dicta, accusamus optio qui quae modi assumenda temporibus error nihil quidem, nemo quas! Ab aut at molestiae doloremque doloribus voluptates quia iusto fuga, nisi nam similique iure, reprehenderit odit? Temporibus ab, velit numquam quia perspiciatis optio debitis quasi incidunt nulla, aliquid fuga veritatis eum, modi consequuntur ratione animi natus? Nisi excepturi doloremque nobis laudantium? Ipsam consequuntur iusto placeat harum ipsum tenetur, veritatis dolorem aperiam similique maxime quia soluta sed sint magnam est officiis aliquam nihil vitae doloribus, facilis a numquam atque dolore quis. Dolorum at dignissimos, eaque, corrupti enim labore ab consequatur numquam rerum suscipit quos sapiente ipsam dolore rem deserunt veritatis. Quaerat nemo, debitis doloribus nobis officiis ea magni fuga inventore ipsam earum fugit itaque maxime dolor ex totam sequi illo aperiam assumenda dignissimos beatae. Provident, maxime odit suscipit est dolorem, nisi, deserunt optio sed impedit praesentium fugit corporis aperiam aut corrupti soluta illum quidem hic nobis magni expedita quas inventore obcaecati. Voluptas corporis consequuntur dolore natus deleniti expedita repellat molestias ipsa sequi adipisci eaque quas autem distinctio ullam deserunt itaque quo eligendi, quisquam et! Earum quas, sapiente corporis iusto consequatur in voluptatibus ad quae nihil veniam suscipit labore ex minima praesentium excepturi eligendi quod, molestias vero eaque enim exercitationem possimus? Nam expedita laudantium iusto tenetur pariatur. Sint vel molestiae error, quae asperiores accusamus. Neque assumenda quaerat, eos excepturi autem dolorem alias. Nam maiores cumque minima soluta debitis tenetur sequi neque provident beatae facere sunt officia molestias, aut vel! Veritatis, numquam. Nemo cumque delectus tenetur sapiente, neque consequatur dolorum eius quis, labore laudantium, quidem aspernatur itaque! Nobis voluptatem soluta fugit aut dicta nam eius. Tenetur molestiae eum atque reiciendis voluptatibus tempore temporibus sit quod possimus nulla. Quam incidunt, odit placeat impedit aut molestias quasi blanditiis enim, obcaecati nemo deleniti nihil deserunt harum in magni magnam sint corrupti accusantium. Officiis illum a aliquam repellendus necessitatibus? Eius numquam ab repellendus ratione cum voluptatibus porro impedit debitis placeat veritatis alias nulla qui sequi sint obcaecati ullam natus dicta, adipisci labore repudiandae corporis doloribus. Nulla soluta animi nemo, quaerat libero hic perferendis commodi quam qui officia aut exercitationem, nisi voluptatum neque repellat optio autem consectetur cumque cupiditate inventore voluptas ut. Nisi porro, voluptatibus dolorum fuga impedit mollitia. Deleniti ratione tempora doloremque enim, minima delectus velit, excepturi, perferendis autem laudantium aliquid sunt! Commodi magnam explicabo accusantium et cupiditate assumenda laudantium repellendus aliquam fuga dicta modi, vero laboriosam iusto eos optio, blanditiis illum numquam ducimus ab sunt? Ut, nesciunt, cupiditate magnam itaque eum necessitatibus eius libero deleniti hic, vel facilis odit maxime mollitia debitis numquam voluptatibus quod ducimus veniam saepe? Aut dignissimos, porro, voluptates, nulla possimus culpa illum fugiat rem fugit et tenetur doloremque non quia veniam maiores alias vitae repellendus sit laudantium consectetur? Ullam vel explicabo qui cupiditate incidunt veniam omnis repellendus est reprehenderit, quasi numquam. Eos quia atque voluptates excepturi, doloremque, itaque blanditiis aut maiores aperiam, nostrum explicabo a repudiandae nemo inventore. Sint ad enim, aliquam quia fugit at fuga excepturi soluta corrupti nisi rerum a laboriosam ut, iusto dolorem molestiae ab. Nisi beatae error nulla nobis quasi est deleniti, totam esse debitis ducimus, porro blanditiis maxime officiis nam sed soluta voluptates. Sequi deserunt temporibus debitis quasi quis hic sunt eveniet saepe quod voluptas modi, ducimus quam ratione repudiandae. Mollitia quod rerum nisi molestias praesentium distinctio! Illo hic corporis illum commodi, autem nulla recusandae.</p>
        </main>
    );
}

export default Page;