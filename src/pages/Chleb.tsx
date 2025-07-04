function Chleb() {
  return (
    <div className="font-sans max-w-4xl mx-auto p-5">
      <h1 className="text-left text-red-400 text-3xl font-bold mb-6">
        Przepis na Domowy Chleb
      </h1>

      <h2 className="text-red-400 text-2xl font-semibold mb-4">Składniki:</h2>
      <ul className="list-disc ml-8 mb-6 text-gray-400">
        <li>
          1 kg mąki pszennej (najlepiej typ 00* albo typ 450, około 6-6.5
          szklanki)
        </li>
        <li>
          600-700 ml ciepłej wody (zacznij od 600 ml i dodawaj więcej, jeśli
          ciasto będzie zbyt suche)
        </li>
        <li>3 łyżki delikatnej oliwy</li>
        <li>
          50g suchych drożdży (czyli 2 saszetki po 25g, jeśli jedna saszetka
          jest na 500g mąki) albo świeże drożdże
        </li>
        <li>3 płaskie łyżeczki soli</li>
        <li>3 płaskie łyżeczki cukru</li>
      </ul>

      <h2 className="text-red-400 text-2xl font-semibold mb-4">
        Instrukcje krok po kroku:
      </h2>

      <h3 className="text-white text-xl font-semibold mb-3">
        1. Przygotowanie rozczynu (preferowane):
      </h3>
      <ol className="list-decimal ml-8 mb-6 text-gray-400">
        <li>
          Wlej około 150 ml ciepłej wody (z odmierzonej ilości) do dużej miski.
        </li>
        <li>Dodaj całe 50g suchych drożdży i 3 płaskie łyżeczki cukru.</li>
        <li>Wymieszaj i odstaw w ciepłe miejsce na 5-10 minut.</li>
        <li>
          Powinna pojawić się piana na powierzchni – to znak, że drożdże są
          aktywne.
        </li>
      </ol>

      <h3 className="text-white text-xl font-semibold mb-3">
        2. Mieszanie składników:
      </h3>
      <ol className="list-decimal ml-8 mb-6 text-gray-400" start={5}>
        <li>
          Do misy miksera (lub dużej miski do ręcznego wyrabiania) wsyp 1 kg
          mąki.
        </li>
        <li>Dodaj 3 płaskie łyżeczki soli i dobrze wymieszaj.</li>
        <li>
          Wlej przygotowany rozczyn oraz pozostałą ciepłą wodę (zacznij od 450
          ml, aby łącznie było 600 ml) i 3 łyżki oliwy.
        </li>
      </ol>

      <h3 className="text-white text-xl font-semibold mb-3">
        3. Wyrabianie ciasta:
      </h3>
      <ol className="list-decimal ml-8 mb-6 text-gray-400" start={8}>
        <li>
          Załóż hak do ciasta na mikserze i wyrabiaj ciasto na średnich obrotach
          przez około 8-10 minut, aż będzie elastyczne, gładkie i nie będzie
          kleiło się do ścianek misy.
        </li>
        <li>
          Jeśli wyrabiasz ręcznie, zajmie to około 10-15 minut energicznego
          zagniatania.
        </li>
        <li>
          Jeśli ciasto jest zbyt suche, dodawaj stopniowo resztę wody (do 100
          ml), aż uzyskasz odpowiednią konsystencję.
        </li>
        <li>Jeśli jest zbyt klejące, dodaj odrobinę mąki.</li>
      </ol>

      <h3 className="text-white text-xl font-semibold mb-3">
        4. Pierwsze wyrastanie:
      </h3>
      <ol className="list-decimal ml-8 mb-6 text-gray-400" start={12}>
        <li>
          Wyrobione ciasto uformuj w kulę, posmaruj delikatnie oliwą i włóż z
          powrotem do czystej miski.
        </li>
        <li>
          Przykryj miskę folią spożywczą lub czystą ściereczką i odstaw w ciepłe
          miejsce na około 1-1.5 godziny, lub do momentu, aż podwoi swoją
          objętość.
        </li>
      </ol>

      <h3 className="text-white text-xl font-semibold mb-3">
        5. Obrabianie i formowanie:
      </h3>
      <ol className="list-decimal ml-8 mb-6 text-gray-400" start={14}>
        <li>
          Gdy ciasto podwoi swoją objętość, wyjmij je z miski i delikatnie
          odgazuj, krótko zagniatając, aby usunąć nadmiar powietrza.
        </li>
        <li>
          Uformuj bochenek w pożądany kształt. Możesz go włożyć do wysmarowanej
          i oprószonej mąką formy do pieczenia lub położyć bezpośrednio na
          blasze wyłożonej papierem do pieczenia (jeśli pieczesz na płasko).
        </li>
      </ol>

      <h3 className="text-white text-xl font-semibold mb-3">
        6. Drugie wyrastanie (garowanie):
      </h3>
      <ol className="list-decimal ml-8 mb-6 text-gray-400" start={16}>
        <li>
          Przykryj uformowany bochenek (lub formę) ponownie ściereczką i odstaw
          w ciepłe miejsce na około 30-60 minut, lub do momentu, aż chleb
          wyraźnie zwiększy objętość i będzie puszysty.
        </li>
      </ol>

      <h3 className="text-white text-xl font-semibold mb-3">
        7. Pieczenie:
      </h3>
      <ol className="list-decimal ml-8 mb-6 text-gray-400" start={17}>
        <li>
          Rozgrzej piekarnik do{" "}
          <strong className="font-bold">220°C (góra-dół)</strong>.
        </li>
        <li>Jeśli masz kamień do pizzy, nagrzej go razem z piekarnikiem.</li>
        <li>Wstaw wyrośnięty chleb do gorącego piekarnika.</li>
        <li>
          Możesz wstawić na dno piekarnika naczynie z gorącą wodą, aby stworzyć
          parę - to pomoże uzyskać chrupiącą skórkę.
        </li>
        <li>
          Piecz przez około 15-20 minut, następnie zmniejsz temperaturę do{" "}
          <strong className="font-bold">190-200°C</strong> i piecz przez kolejne
          30-40 minut, lub do momentu, aż chleb będzie złocistobrązowy, a po
          opukaniu spodu będzie wydawał głuchy dźwięk.
        </li>
        <li>
          Czas pieczenia może się różnić w zależności od piekarnika i pożądanego
          stopnia wypieczenia.
        </li>
      </ol>

      <h3 className="text-white text-xl font-semibold mb-3">
        8. Studzenie:
      </h3>
      <ol className="list-decimal ml-8 mb-6 text-gray-400" start={22}>
        <li>
          Wyjmij chleb z piekarnika i od razu przełóż na kratkę do studzenia.
        </li>
        <li>Pozostaw do całkowitego ostygnięcia przed krojeniem.</li>
      </ol>
    </div>
  );
}

export default Chleb;
