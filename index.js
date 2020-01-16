$closingVal = 0;
$contribFreq = 0;
$compoundFreq = 365;

var dict = {
  "0": "Choose...",
  "1": 52,
  "2": 26,
  "3": 12,
  "4": 1
};
var compoundPeriods = {
  "0": 365,
  "1": 52,
  "2": 12,
  "3": 1
};

const plot = (principle, contributions, interest) => {
  let data = [
    {
      values: [principle, contributions, interest],
      labels: [
        "Initial Amount Invested",
        "Additional Contributions",
        "Total Interest Earned"
      ],
      type: "pie",
      font: {
        color: "white"
      }
    }
  ];

  let layout = {
    height: 400,
    width: 500,
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",
    font: {
      color: "white"
    },
    title: {
      text: "Investment Breakdown",
      color: "white"
    }
  };

  Plotly.newPlot("investmentBreakdownChart", data, layout);
};

$(document).ready(() => {
  $("h3#closingVal").text($closingVal.toFixed(2));

  $("select#contributionFreq").change(() => {
    $selectedText = $("select#contributionFreq")
      .find("option:selected")
      .val();
    $contribFreq = dict[$selectedText];
  });

  $("select#compoundFreq").change(() => {
    $selectedText = $("select#compoundFreq")
      .find("option:selected")
      .val();
    console.log($selectedText);
    $compoundFreq = compoundPeriods[$selectedText];
    console.log($compoundFreq);
  });

  $("button#submit").click(function() {
    console.log($compoundFreq);
    $openingVal = $("input#openingVal").val()
      ? parseFloat($("input#openingVal").val())
      : 0;
    $ror = $("input#rateOfReturn").val()
      ? $("input#rateOfReturn").val() / 100
      : 0;
    $time = $("input#timeHorizon").val() ? $("input#timeHorizon").val() : 0;
    $additionalCont = $("input#additionalContributions").val()
      ? $("input#additionalContributions").val()
      : 0;
    if ($contribFreq === "Choose..." && $additionalCont != 0) {
      alert("LEMAO JAMES");
      return;
    }
    $closingVal =
      $openingVal * Math.pow(1 + $ror / $compoundFreq, $compoundFreq * $time);
    $additional =
      $additionalCont > 0
        ? $additionalCont *
          ($contribFreq / $compoundFreq) *
          ((Math.pow(1 + $ror / $compoundFreq, $time * $compoundFreq) - 1) /
            ($ror / $compoundFreq))
        : 0;
    $interestEarned =
      $closingVal -
      $openingVal +
      ($additional - $additionalCont * ($time * $contribFreq));
    $contributions = $additionalCont * $time * $contribFreq;
    $closingVal += $additional;
    plot(
      $openingVal.toFixed(2),
      $contributions.toFixed(2),
      $interestEarned.toFixed(2)
    );
    $("#closingVal").text($closingVal.toFixed(2));
  });
});
