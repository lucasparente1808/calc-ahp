import React from 'react';
import './box-sobre.css';

const Boxsobre = () => {
    return (
        <div className='box-home'>
            <div className='box-principal'>
                <h2 className='titulo-principal'> História do Projeto </h2>
                <p className='texto-sobre'> Este projeto nasceu de um TCC realizado por <strong>Lucas Parente Gonçalves</strong>, sob orientação da professora 
                    <strong> Marcilene de Fátima Dianin Vianna</strong>, que visava propor um software para o Analytic Hierarchy Process (AHP) e suas extensões. 
                    Reconhecendo as limitações dos softwares disponíveis para essa aplicação, o objetivo central foi desenvolver uma 
                    ferramenta abrangente e flexível, capaz de fornecer detalhes precisos e facilitar a análise de múltiplos critérios 
                    e alternativas. Embasado no referencial teórico do AHP, este projeto representa um compromisso com a excelência acadêmica 
                    e técnica.
                </p>
                <p className='texto-sobre'>
                    Ao longo desta jornada, cada etapa foi impulsionada pelo desejo de oferecer uma solução robusta e inovadora. O resultado final não é 
                    apenas um software, mas sim o reflexo de uma dedicação incessante à pesquisa, aprendizado e qualidade. Este projeto convida você a 
                    embarcar em uma jornada de descobertas e possibilidades, onde a tomada de decisões fundamentadas se torna mais acessível e eficaz. 
                </p>
                <p className='texto-sobre'>
                    Nesse primeiro estágio do desenvolvimento, concentramos nossos esforços na implementação do método AHP clássico. Esta escolha estratégica 
                    nos permitiu estabelecer uma base sólida para o projeto, garantindo sua funcionalidade e eficácia. No entanto, estamos cientes de que o campo 
                    da tomada de decisões complexas é vasto e em constante evolução. Como parte de trabalhos futuros, planejamos expandir nossa plataforma para incluir 
                    outros métodos derivados do AHP, como AHP fuzzy, AHP por rating e AHP em grupo. Além disso, também consideramos a integração de outros métodos de 
                    análise multicritério, como Electre e Promethee, ampliando assim o escopo e a utilidade do software desenvolvido. Este é apenas o começo de uma jornada 
                    contínua rumo à excelência e inovação na área da tomada de decisões.
                </p>
                <h2 className='titulo-pessoas'> Pessoas Envolvidas </h2>
                <h3 className='titulo-pessoas'> Responsáveis pelo inicio do projeto</h3>
                <ol className='container-nomes'>
                    <li className='nome-individual'>Lucas Parente Gonçalves</li>
                    <li className='nome-individual'>Marcilene de Fátima Dianin Vianna</li>
                </ol>

                <h3 className='titulo-pessoas'> Desenvolvedores ligados ao projeto</h3>
                <ol className='container-nomes'>
                    <li className='nome-individual'>Lucas Parente Gonçalves</li>
                </ol>
            </div>
        </div>
    );
};

export default Boxsobre;