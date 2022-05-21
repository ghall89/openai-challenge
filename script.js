const rspArr = [];

const displayChat = () => {
	const chatArea = document.querySelector('#chat-area');
	const item = rspArr[rspArr.length - 1];

	const chatItem = `
	<li
		class="
			list-group-item
			d-flex
			justify-content-between
			align-items-start
		"
	>
		<div class="ms-2 me-auto">
			<div class="fw-bold">${item.query}</div>
			${item.response}
		</div>
	</li>
	`;

	chatArea.insertAdjacentHTML('beforeend', chatItem);
};

const send = () => {
	event.preventDefault();

	const queryInput = document.querySelector('#query-input');
	const queryValue = queryInput.value;
	queryInput.value = '';

	const data = {
		prompt: queryValue,
		temperature: 0.5,
		max_tokens: 64,
		top_p: 1.0,
		frequency_penalty: 0.0,
		presence_penalty: 0.0
	};

	fetch('https://api.openai.com/v1/engines/text-curie-001/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.MY_VAR}`
		},
		body: JSON.stringify(data)
	})
		.then(rsp => {
			rsp.json().then(data => {
				console.log(data.choices[0].text);
				const msg = {
					query: queryValue,
					response: data.choices[0].text
				};

				rspArr.push(msg);
				console.log(rspArr);
				displayChat();
			});
		})
		.catch(error => {
			alert(error);
		});
};
